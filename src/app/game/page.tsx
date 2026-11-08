"use client";

import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { readRound, writeRound, clearRound, claimRound, newRoundId, SavedRound } from '@/lib/round-storage';
import { useGame } from '@/contexts/GameContext';
import { Clarification } from '@/components/game/Clarification';
import { GameHeader } from '@/components/game/GameHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Trophy, CheckCircle, XCircle, Clock, Star, Brain, Users, Heart, BookOpen, Send, Sparkles, Delete, RotateCcw } from 'lucide-react';
import { AdBanner } from '@/components/game/AdBanner';
import { generateWordSearchGrid, normalizeGridWord } from '@/lib/word-search';
import { selectFresh, identity, readExposure, markExposure, missingPositions, buildSearchSets, buildRosco, progressAdvice, readProgress, progressOwner, progressStorageKey } from '@/lib/practice';
import { normalizeForValidation, answersMatch } from '@/lib/string-utils';
import { getNewChallenges } from '@/data/newChallengesData';
import { filterByDoctrinalProfile } from '@/utils/doctrinalFilter';
import { learningEngine } from '@/services/learningEngine';
import { educationalAnalyticsEngine } from '@/services/educationalAnalyticsEngine';
import { adaptiveLearningEngine } from '@/services/adaptiveLearningEngine';
import { LearningProfile } from '@/types/education';
import { eventBus } from '@/services/eventBus';
import { pluginManager } from '@/plugins/PluginManager';

// Helper pure functions preserved from original implementation
function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function scrambleWord(challenge: any, type: 'syllables' | 'letters') {
    const parts: string[] = type === 'syllables' && challenge.syllables ? challenge.syllables : challenge.answer.toUpperCase().split('');
    let shuffled = shuffleArray(parts);
    if(shuffled.join('') === parts.join('') && new Set(parts).size > 1) shuffled = [...parts.slice(1),parts[0]];
    return shuffled.join(type === 'syllables' ? ' - ' : ' ');
}

// Inferred word category helper for enhanced contextual gaming
function getWordCategory(word: string, lang: string = 'es'): string {
  const cleanWord = normalizeForValidation(word).toUpperCase();
  
  const books = [
    "GENESIS", "EXODO", "SALMOS", "APOCALIPSIS", "PENTATEUCO", 
    "LEVITICO", "NUMEROS", "DEUTERONOMIO", "MATEO", 
    "MARCOS", "LUCAS", "JUAN", "HECHOS", "ROMANOS", "CORINTIOS", 
    "GALATAS", "EFESIOS", "FILIPENSES", "COLOSENSES", "TESALONICENSES", 
    "TIMOTEO", "TITO", "FILEMON", "HEBREOS", "SANTIAGO", "PEDRO", 
    "JUAN", "JUDAS", "TESTAMENTO"
  ];
  
  const people = [
    "CAIN", "ABEL", "DAVID", "MOISES", "ABRAHAM", "SALOMON", "GOLIAT", 
    "SANSON", "DANIEL", "ISAIAS", "JONAS", "RUT", "ESTER", "JOB", 
    "MARIA", "PEDRO", "PABLO", "JESUS", "NOE", "ADAN", "EVA", 
    "APOSTOL", "PROFETA", "ANGEL", "HERMANO", "REINA", "HIJO"
  ];
  
  const places = [
    "BELEN", "JERUSALEN", "NAZARET", "DESIERTO", "SINAGOGA", 
    "EUFRATES", "TEMPLO", "EGIPTO", "GALAAD", "EDEN", "CANAA", "CIUDAD"
  ];

  if (books.includes(cleanWord)) {
    return lang === 'es' ? 'Libro Bíblico' : 'Bible Book';
  }
  if (people.includes(cleanWord)) {
    return lang === 'es' ? 'Personaje Bíblico' : 'Bible Character';
  }
  if (places.includes(cleanWord)) {
    return lang === 'es' ? 'Lugar Bíblico' : 'Bible Place';
  }
  
  return lang === 'es' ? 'Concepto/Tema' : 'Concept/Theme';
}

function generateCompletePhraseChallenge(c: any, difficulty: string) {
    const words = c.fullPhrase.split(' ');
    const len = words.length;
    const missingIndices = missingPositions(len, difficulty);

    const questionWords = words.map((w: string, i: number) => missingIndices.includes(i) ? '_______' : w);
    const question = questionWords.join(' ');
    const fullAnswer = c.fullPhrase;

    return {
        ...c,
        question,
        fullAnswer,
        missingIndices,
        words
    };
}

function generateGuessPhraseChallenge(c: any, difficulty: string) {
    let preGuessed: string[] = [];
    const phraseChars = [...new Set(normalizeForValidation(c.phrase).replace(/ /g, ''))];
    
    if (difficulty === 'principiante') {
        const revealCount = Math.floor(phraseChars.length * 0.3);
        const shuffled = shuffleArray(phraseChars);
        preGuessed = shuffled.slice(0, revealCount);
    } else if (difficulty === 'discipulo') {
        const revealCount = Math.floor(phraseChars.length * 0.15);
        const shuffled = shuffleArray(phraseChars);
        preGuessed = shuffled.slice(0, revealCount);
    }
    return {
        ...c,
        preGuessed
    };
}

export default function GamePage() {
  const {storageOwner,preferencesReady}=useGame();
  return preferencesReady?<RoundLoader key={storageOwner} owner={storageOwner}/>:<main className="p-6" role="status">Abriendo tus avances…</main>;
}
function RoundLoader({owner}:{owner:string}) {
  const { restoreRoundConfig, pendingRoundId, setPendingRoundId } = useGame();
  const router=useRouter();
  const [loaded,setLoaded]=useState<{saved:SavedRound|null;id:string}|null>(null);
  const [blocked,setBlocked]=useState(false);const [retry,setRetry]=useState(0);
  const restore=useRef(restoreRoundConfig),intent=useRef(pendingRoundId);
  useEffect(()=>{
    let cancelled=false;let release:(()=>void)|null=null;
    const lost=()=>{setLoaded(null);setBlocked(true);};window.addEventListener('dp-round-lock-lost',lost);
    void (async()=>{
      const requested=new URLSearchParams(window.location.search).get('round');
      const previous=readRound(requested,owner);const id=previous?.id||requested||newRoundId();
      if(!previous&&(!requested||intent.current!==requested)){router.replace('/setup');return;}
      release=await claimRound(id,owner);
      if(cancelled){release?.();return;}
      if(!release){setBlocked(true);return;}
      const saved=readRound(id,owner);
      if(saved)restore.current(saved.config);
      setPendingRoundId(null);setBlocked(false);setLoaded({saved,id});
    })().catch(()=>{if(!cancelled)setBlocked(true);});
    return()=>{cancelled=true;release?.();window.removeEventListener('dp-round-lock-lost',lost);};
  },[owner,retry,router,setPendingRoundId]);
  if(blocked)return <main className="max-w-lg mx-auto p-6 space-y-4"><h1 className="text-2xl font-bold">Este recorrido está abierto en otra pestaña</h1><p>Continúa allí o cierra esa pestaña y vuelve a intentarlo aquí. Así protegemos tus respuestas.</p><Button onClick={()=>{setBlocked(false);setRetry(n=>n+1);}}>Ya cerré la otra pestaña · Continuar aquí</Button><Button variant="outline" onClick={()=>router.push('/setup')}>Volver a actividades</Button></main>;
  if(!loaded)return <main className="p-6" role="status">Recuperando tu recorrido…</main>;
  return <GameRound saved={loaded.saved} roundId={loaded.id} owner={owner}/>;
}

function GameRound({saved,roundId,owner}:{saved:SavedRound|null;roundId:string;owner:string}) {
  const router = useRouter();
  const { 
    teams, gameMode, isPracticeMode, playSound, 
    updateScore, resetGame, restartCurrentGame, roundTime, updateLives, 
    gameRestarted, difficulty, language, isPremium, t, bibleData, activeLesson,
    doctrinalProfile, learningProfile, setLearningProfile, bibleVersion, setDifficulty, includeGuidedContent
  } = useGame();
  
  const initialRestart = useRef(gameRestarted);
  const restartSeen = useRef(gameRestarted);
  const restoring = useRef(!!saved);
  const d = saved?.data;
  const [saveFailed,setSaveFailed]=useState(false);
  const [sessionVersion, setSessionVersion] = useState(0);
  const [readyToAnswer, setReadyToAnswer] = useState<boolean>(d?.readyToAnswer ?? false);
  const [helpMessage, setHelpMessage] = useState<string>(d?.helpMessage ?? '');
  const [roundReview, setRoundReview] = useState<boolean>(d?.roundReview ?? false);
  const attemptHadError = useRef(!!saved?.data.attemptHadError);
  const usedHint = useRef(!!saved?.data.usedHint);
  const scope = `${gameMode}:${bibleVersion}`;
  const history = useMemo(() => readExposure(scope), [scope, sessionVersion]);
  const progressKey = `dp_progress_v1:${gameMode}:${difficulty}:${bibleVersion}`;
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(d?.currentChallengeIndex ?? 0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState<number>(d?.currentTeamIndex ?? 0);
  const [answer, setAnswer] = useState<string>(d?.answer ?? '');
  const [timeLeft, setTimeLeft] = useState<number>(d?.timeLeft ?? roundTime);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(d?.feedback ?? null);
  const [gameOver, setGameOver] = useState(false);
  const pausedRef = useRef(!!saved);
  const [isPaused,setPaused]=useState(!!saved);
  const submittedRef = useRef(!!d?.submitted);
  const letterLock = useRef(false);
  const answeredRosco = useRef(new Set<string>(d?.answeredRosco||[]));
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // Hint reveal system
  const [hintRevealed, setHintRevealed] = useState<boolean>(d?.hintRevealed ?? false);
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { if(hintRevealed) usedHint.current=true; }, [hintRevealed]);

  // States for new challenge modes
  const [teamActiveRoscoIndex, setTeamActiveRoscoIndex] = useState<Record<number, number>>(d?.teamActiveRoscoIndex ?? {});
  const [teamRoscoAnswers, setTeamRoscoAnswers] = useState<Record<number, Record<number, 'correct' | 'incorrect' | 'skipped'>>>(d?.teamRoscoAnswers ?? {});
  const [teamTimeLeft, setTeamTimeLeft] = useState<Record<number, number>>(d?.teamTimeLeft ?? {});
  const [isTurnPaused, setIsTurnPaused] = useState<boolean>(d?.isTurnPaused ?? true);
  const [showComparison, setShowComparison] = useState<boolean>(d?.showComparison ?? false);
  const [lastIncorrectWord, setLastIncorrectWord] = useState<{ word: string; letter: string; teamName: string } | null>(d?.lastIncorrectWord ?? null);
  
  // States for Word Search

  const [wsSelected, setWsSelected] = useState<{r: number, c: number}[]>(d?.wsSelected ?? []);
  const [wsFound, setWsFound] = useState<string[]>(d?.wsFound ?? []);
  
  // States for Classification
  const [classItemIndex, setClassItemIndex] = useState<number>(d?.classItemIndex ?? 0);

  // For "Guess the Phrase"
  const [guessedLetters, setGuessedLetters] = useState<string[]>(d?.guessedLetters ?? []);
  const [letterInput, setLetterInput] = useState<string>(d?.letterInput ?? '');
  const [isCancelled, setIsCancelled] = useState(false);
  const [playedChallenges, setPlayedChallenges] = useState<any[]>(d?.playedChallenges ?? []);
  const hasFinishedRef = useRef(false);
  const hasStartedRef = useRef(false);
  
  // ARIA Live Region State
  const [ariaMessage, setAriaMessage] = useState('');

  // Accessibility Announcements
  useEffect(() => {
    if (feedback === 'correct') {
      setAriaMessage(gameMode === 'counseling-practical' ? 'Lee la orientación y continúa reflexionando' : 'Respuesta correcta');
    } else if (feedback === 'incorrect') {
      setAriaMessage('Vamos a repasarlo. Puedes aprender de este intento.');
    }
  }, [feedback, language]);
  
  useEffect(() => {
    if (timeLeft === 0 && !isPracticeMode && !isTurnPaused && !gameOver) {
      setAriaMessage(('Tiempo terminado'));
    }
  }, [timeLeft, isPracticeMode, isTurnPaused, gameOver, language]);

  const sessionProgress = useMemo(() => {
    const previous = readProgress(progressKey);
    const results = playedChallenges.filter(x => typeof x._isCorrect === 'boolean');
    const current = {total:results.length,correct:results.filter(x=>x._isCorrect).length,assisted:results.filter(x=>x._usedHint).length,ids:results.map(identity)};
    return progressAdvice([...previous, ...(gameOver && current.total ? [current] : [])]);
  }, [gameOver, playedChallenges, progressKey]);

  const generatedChallenges = useMemo<any[]>(() => {
    if (saved && sessionVersion===0) return saved.data.challenges;
    if (!gameMode) return [];
    const select = (items: any[], count = 5 * Math.max(1, teams.length)) => selectFresh(items, history, count);

    // If there is an active lesson loaded via classroom sharing, use those challenges directly
    if (activeLesson && activeLesson.challenges && activeLesson.challenges.length > 0) {
      if (gameMode === 'complete-phrase') {
        return activeLesson.challenges.map(c => generateCompletePhraseChallenge(c, difficulty));
      }
      if (gameMode === 'guess-the-phrase') {
        return activeLesson.challenges.map(c => generateGuessPhraseChallenge(c, difficulty));
      }
      return activeLesson.challenges.map(challenge => ({
        ...challenge,
        question: scrambleWord(challenge, difficulty === 'principiante' ? 'syllables' : 'letters'),
        level: difficulty === 'principiante' ? 1 : 2,
        hint: challenge.hint,
      }));
    }

    if (gameMode === 'bible-rosco') {
      const lists = getNewChallenges(language).rosco[difficulty];
      return buildRosco(lists.map(list => filterByDoctrinalProfile(list, doctrinalProfile)), history, teams.length);
    }
    if (gameMode === 'word-search') {
      const catalog=getNewChallenges(language);
      const words=filterByDoctrinalProfile([...bibleData.findWordLevel1,...bibleData.findWordLevel2],doctrinalProfile);
      const generated=buildSearchSets(words, difficulty === 'principiante' ? 4 : difficulty === 'discipulo' ? 5 : 6);
      const sets=[...filterByDoctrinalProfile(catalog.wordSearch[difficulty],doctrinalProfile).map(x=>({...x,type:'word-search'})),...generated,
        ...filterByDoctrinalProfile(catalog.classification,doctrinalProfile).map(x=>({...x,type:'classification',items:shuffleArray(x.items)}))];
      return select(sets);
    }
    if (gameMode === 'counseling-practical') {
      return select(filterByDoctrinalProfile(getNewChallenges(language).counseling,doctrinalProfile).filter(item => includeGuidedContent || !item.guidance)).map(item => {
        const options=shuffleArray(item.options.map((text: string,index: number)=>({text,correct:index===item.correctIndex})));
        return {...item,options:options.map((x:any)=>x.text),correctIndex:options.findIndex((x:any)=>x.correct)};
      });
    }

    // Otherwise, generate challenges from local JSON catalog
    if (gameMode === 'find-word') {
      const first=filterByDoctrinalProfile(bibleData.findWordLevel1,doctrinalProfile).filter(x=>(x.syllables?.length || 0)>1);
      const second=filterByDoctrinalProfile(bibleData.findWordLevel2,doctrinalProfile);
      const pool=difficulty === 'principiante' ? first : difficulty === 'avanzado' ? second : [...first,...second];
      return select(pool).map(item=>({...item,question:scrambleWord(item,difficulty==='principiante' ? 'syllables':'letters'),level:difficulty==='principiante'?1:2,
        hint:item.hint}));
    }

    if (gameMode === 'complete-phrase') {
        const filtered = filterByDoctrinalProfile(bibleData.completePhraseChallenges, doctrinalProfile, 5);
        return select(filtered).map(c => generateCompletePhraseChallenge(c, difficulty));
    }
    
    if (gameMode === 'guess-the-phrase') {
      const filtered = filterByDoctrinalProfile(bibleData.guessPhraseChallenges, doctrinalProfile, 5);
      return select(filtered).map(c => generateGuessPhraseChallenge(c, difficulty));
    }

    return [];
  }, [gameMode, difficulty, bibleData, activeLesson, language, doctrinalProfile, history, teams.length, includeGuidedContent, saved, sessionVersion]);
  const challenges = useMemo<any[]>(() => {
    if(activeLesson || gameMode === 'bible-rosco') return generatedChallenges;
    const participants=Math.max(1,teams.length);
    const count=Math.min(generatedChallenges.length,5*participants);
    return generatedChallenges.slice(0,participants>1?Math.floor(count/participants)*participants:count);
  }, [generatedChallenges, activeLesson, gameMode, teams.length]);

  const wsGrid = useMemo(() => {
    if(saved && sessionVersion===0 && gameRestarted===initialRestart.current && currentChallengeIndex===d.currentChallengeIndex) return d.wsGrid as string[][];
    const current = challenges[currentChallengeIndex];
    return current?.type === 'word-search'
      ? generateWordSearchGrid(current.words, difficulty === 'principiante' ? 8 : difficulty === 'discipulo' ? 10 : 12)
      : [];
  }, [challenges, currentChallengeIndex, difficulty, gameRestarted, saved, d, sessionVersion]);

  useEffect(() => {
    if(restoring.current)return;
    const challenge = challenges[currentChallengeIndex];
    if (gameMode === 'guess-the-phrase' && challenge?.preGuessed) {
      setGuessedLetters(challenge.preGuessed);
    } else {
      setGuessedLetters([]);
    }
  }, [currentChallengeIndex, challenges, gameMode, gameRestarted]);

  useEffect(() => {
    if(restoring.current)return;
    const challenge = challenges[currentChallengeIndex];
    if (challenge && challenge.type === 'word-search') {
      setWsSelected([]);
      setWsFound([]);
    }
    if (challenge && challenge.type === 'classification') {
      setClassItemIndex(0);
      setHintRevealed(false);
    }
    if (gameMode === 'bible-rosco') {
      setTeamActiveRoscoIndex({});
      setTeamRoscoAnswers({});
      
      const initialTimes: Record<number, number> = {};
      teams.forEach((_, idx) => {
        initialTimes[idx] = roundTime;
      });
      setTeamTimeLeft(initialTimes);
      
      setTimeLeft(roundTime);
      setIsTurnPaused(true);
      setShowComparison(false);
      setLastIncorrectWord(null);
    }
  }, [currentChallengeIndex, challenges, difficulty, gameMode, gameRestarted]);

  const startTimer = () => {
    if(gameMode==='bible-rosco')return;
    if (timerRef.current) clearInterval(timerRef.current);
    if (!readyToAnswer || isPracticeMode || gameOver || gameMode === 'guess-the-phrase' || !!feedback) {
        return;
    }
    
    
    timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
            if (pausedRef.current) return prevTime;
            if (prevTime <= 1) {
                if(timerRef.current) clearInterval(timerRef.current);
                return 0;
            }
            if (prevTime <= 11 && prevTime > 1) {
              playSound('tick');
            }
            return prevTime - 1;
        });
    }, 1000);
  };

  // Handle timer expiration
  useEffect(() => {
    if (timeLeft === 0 && !pausedRef.current && !isPracticeMode && !gameOver && gameMode !== 'guess-the-phrase' && !feedback) {
      playSound('times-up');
      if (gameMode === 'bible-rosco') {
        const updatedTimes = { ...teamTimeLeft, [currentTeamIndex]: 0 };
        setTeamTimeLeft(updatedTimes);
        setIsTurnPaused(true);
        
        const roscoLetters = challenges[currentTeamIndex]?.letters || challenges[0]?.letters || [];
        const activeIndex = teamActiveRoscoIndex[currentTeamIndex] || 0;
        const activeLetterChallenge = roscoLetters[activeIndex];
        
        if (activeLetterChallenge) {
          setLastIncorrectWord({
            word: activeLetterChallenge.word,
            letter: activeLetterChallenge.letter,
            teamName: teams[currentTeamIndex]?.name || `Equipo ${currentTeamIndex + 1}`
          });
        }

        const allFinished = teams.every((_, idx) => {
          const ans = teamRoscoAnswers[idx] || {};
          const tTime = updatedTimes[idx] ?? roundTime;
          const keys = Object.keys(ans).map(Number);
          const lettersForIdx = challenges[idx]?.letters || challenges[0]?.letters || [];
          const isComplete = keys.length === lettersForIdx.length && keys.every(k => ans[k] !== 'skipped');
          return isComplete || tTime <= 0;
        });
        
        if (allFinished) {
          setGameOver(true);
        } else {
          if (teams.length > 1) {
            setShowComparison(true);
          } else {
            setGameOver(true);
          }
        }
      } else {
        handleAnswer(false);
      }
    }
  }, [timeLeft, isPaused, isPracticeMode, gameOver, gameMode, feedback, teamTimeLeft, currentTeamIndex, teams, roundTime, challenges, currentChallengeIndex, teamRoscoAnswers, teamActiveRoscoIndex]);

  // Handle timer resumes in bible-rosco when unpaused
  useEffect(() => {
    if (gameMode === 'bible-rosco') {
      if (isTurnPaused) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else if (!gameOver && !feedback && !isPracticeMode) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
            if (pausedRef.current) return prevTime;
                if (prevTime <= 1) {
                    if(timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }
                if (prevTime <= 11 && prevTime > 1) {
                  playSound('tick');
                }
                return prevTime - 1;
            });
        }, 1000);
      }
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTurnPaused, gameMode, gameOver, feedback, isPracticeMode]);
  
  // Auto-reveal hint for Principiante after 5s
  useEffect(() => {
    if(restoring.current)return;
    setHintRevealed(false);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);

    return () => { if (hintTimerRef.current) clearTimeout(hintTimerRef.current); };
  }, [currentChallengeIndex, difficulty, feedback]);

  useEffect(() => {
    if (!gameMode) return;
  
    if(gameMode==='bible-rosco')return;
    if (!feedback) {
      startTimer();
    }
  
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameMode, router, currentChallengeIndex, feedback, gameRestarted, gameOver, isPracticeMode, readyToAnswer]);

  useEffect(() => {
    if (gameMode && !hasStartedRef.current) {
        eventBus.emit('GAME_STARTED', { mode: gameMode });
        pluginManager.executeHook('onGameStart', { mode: gameMode });
        hasStartedRef.current = true;
    }
  }, [gameMode]);

  useEffect(() => {
    if (restartSeen.current !== gameRestarted) {
        restartSeen.current = gameRestarted;
        submittedRef.current = false;
        answeredRosco.current.clear();
        pausedRef.current = false;
        setGameOver(false);
        setReadyToAnswer(false);
        setHelpMessage('');
        setRoundReview(false);
        attemptHadError.current = false;
        setTimeLeft(roundTime);
        setCurrentChallengeIndex(0);
        setCurrentTeamIndex(0);
        setAnswer('');
        setFeedback(null);
        setHintRevealed(false);
        setLetterInput('');
        setIsCancelled(false);
        setPlayedChallenges([]);
        setTeamActiveRoscoIndex({});
        setTeamRoscoAnswers({});
        setTeamTimeLeft({});
        setIsTurnPaused(true);
        setShowComparison(false);
        setLastIncorrectWord(null);
        setWsSelected([]);
        setWsFound([]);
        setClassItemIndex(0);
        hasFinishedRef.current = false;
        hasStartedRef.current = false;
        // Re-emit GAME_STARTED after state resets
        if (gameMode) {
          eventBus.emit('GAME_STARTED', { mode: gameMode });
          pluginManager.executeHook('onGameStart', { mode: gameMode });
          hasStartedRef.current = true;
        }
      }
    }, [gameRestarted, gameMode]);

  useEffect(() => { if(restoring.current)return; setReadyToAnswer(false); setHelpMessage(''); attemptHadError.current=false; usedHint.current=false; }, [currentChallengeIndex, gameRestarted]);
  const challenge = challenges[currentChallengeIndex];
  const currentTeam = teams[currentTeamIndex];

  // Phase 8: Educational Analytics on Game Over
  useEffect(() => {
    if (gameOver && !hasFinishedRef.current) {
      hasFinishedRef.current = true;
      eventBus.emit('GAME_FINISHED', { mode: gameMode });

      let total = 0;
      if (bibleData) {
        total = bibleData.findWordLevel1.length + bibleData.findWordLevel2.length + bibleData.completePhraseChallenges.length + bibleData.guessPhraseChallenges.length;
      }
      pluginManager.executeHook('onGameEnd', { mode: gameMode, playedChallenges, totalCatalogSize: total });

      if (!isCancelled && playedChallenges.length > 0) {
        try {
          const previous=readProgress(progressKey);
          const results=playedChallenges.filter(x=>typeof x._isCorrect === 'boolean');
          previous.push({total:results.length,correct:results.filter(x=>x._isCorrect).length,assisted:results.filter(x=>x._usedHint).length,ids:results.map(identity)});
          localStorage.setItem(progressStorageKey(progressKey,owner),JSON.stringify(previous.slice(-20)));
        } catch {}
      }
      if (playedChallenges.length > 0) {
        const analytics = educationalAnalyticsEngine.processGameSession(playedChallenges, total);
        educationalAnalyticsEngine.saveLocalAnalytics(analytics);
      }
    }
  }, [gameOver, playedChallenges, bibleData, gameMode, owner, progressKey, isCancelled]);

  const recordedChallenge = useRef('');
  useEffect(() => {
    const item = gameMode === 'bible-rosco' ? challenges[currentTeamIndex]?.letters[teamActiveRoscoIndex[currentTeamIndex] || 0] : challenge;
    const key = `${sessionVersion}:${gameRestarted}:${gameMode}:${currentTeamIndex}:${currentChallengeIndex}:${gameMode==='bible-rosco' ? teamActiveRoscoIndex[currentTeamIndex] || 0 : ''}`;
    if (!item || recordedChallenge.current === key) return;
    recordedChallenge.current=key;
    if(owner===progressOwner())markExposure(scope,item);
  },[challenge,challenges,gameMode,currentTeamIndex,teamActiveRoscoIndex,currentChallengeIndex,gameRestarted,sessionVersion,scope,owner]);

  // Memoized keyboard grid helper
  const alphabetKeys = useMemo(() => {
    const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    if (language === 'es') {
      base.splice(14, 0, 'Ñ');
    }
    return base;
  }, [language]);

  // Scrambled components for interactive tap typing in "Find the Word"
  const questionParts = useMemo(() => {
    if (gameMode !== 'find-word' || !challenge) return [];
    const q = challenge.question || '';
    if (q.includes(' - ')) {
      return q.split(' - ');
    }
    return q.split(' ');
  }, [challenge, gameMode]);

  // Curated list of safe, positive theological terms for complete-phrase mode
  const completePhraseOptions = useMemo(() => {
    if(saved && sessionVersion===0 && gameRestarted===initialRestart.current && currentChallengeIndex===d.currentChallengeIndex) return d.completePhraseOptions as string[];
    if (gameMode !== 'complete-phrase' || !challenge) return [];
    const missingIndices = (challenge as any).missingIndices || [];
    const words = (challenge as any).words || [];
    
    // Sort indices ascending to keep correct word order
    const sortedIndices = [...missingIndices].sort((a, b) => a - b);
    const correctOption = sortedIndices.map((idx: number) => words[idx]).join(' ');

    const optionsSet = new Set<string>();
    optionsSet.add(correctOption.toUpperCase());

    const len = missingIndices.length;
    
    // Dynamically build a pool of distractors of exactly the same length 'len' from other challenges
    const pool: string[] = [];
    const otherChallenges = bibleData?.completePhraseChallenges || [];
    if (otherChallenges.length > 0) {
      for (const other of otherChallenges) {
        if (other.fullPhrase && other.fullPhrase.toUpperCase() !== (challenge.fullPhrase || "").toUpperCase()) {
          const otherWords = other.fullPhrase.split(' ');
          if (otherWords.length >= len) {
            for (let i = 0; i <= otherWords.length - len; i++) {
              const subPhrase = otherWords.slice(i, i + len).join(' ').toUpperCase();
              if (subPhrase !== correctOption.toUpperCase()) {
                pool.push(subPhrase);
              }
            }
          }
        }
      }
    }

    // Shuffle and pick distractors
    const shuffledPool = shuffleArray(pool);
    for (const term of shuffledPool) {
      if (optionsSet.size >= 4) break;
      if (term.toUpperCase() !== correctOption.toUpperCase()) {
        optionsSet.add(term.toUpperCase());
      }
    }

    return shuffleArray(Array.from(optionsSet));
  }, [challenge, gameMode, bibleData, saved, d, currentChallengeIndex, gameRestarted, sessionVersion]);

  const snapshotRef = useRef<SavedRound | null>(null);
  snapshotRef.current = gameMode && !gameOver && challenges.length ? {
    schema:1,owner,id:roundId,savedAt:Date.now(),
    config:{teams,gameMode,difficulty,isPracticeMode,roundTime,bibleVersion,includeGuidedContent,activeLesson},
    data:{challenges,currentChallengeIndex,currentTeamIndex,answer,timeLeft,feedback,readyToAnswer,helpMessage,roundReview,hintRevealed,
      teamActiveRoscoIndex,teamRoscoAnswers,teamTimeLeft,isTurnPaused,showComparison,lastIncorrectWord,wsGrid,wsSelected,wsFound,
      classItemIndex,guessedLetters,letterInput,playedChallenges,completePhraseOptions,
      submitted:submittedRef.current,answeredRosco:[...answeredRosco.current],usedHint:usedHint.current,attemptHadError:attemptHadError.current}
  } : null;
  const roundSnapshot=snapshotRef.current;
  useEffect(()=>{
    restoring.current=false;
    if(roundSnapshot){const success=writeRound(roundSnapshot);if(saveFailed===success)setSaveFailed(!success);}
    else if(gameOver)clearRound(roundId,owner);
  },[roundSnapshot,gameOver,roundId,saveFailed,owner]);

  const recordResult = (item: any, correct: boolean) => {
    if(owner!==progressOwner())return;
    const analysis={...learningEngine.analyzeChallenge(item),difficulty:difficulty==='principiante'?1:difficulty==='discipulo'?2:3};
    setPlayedChallenges(prev=>[...prev,{...item,_isCorrect:correct,_usedHint:usedHint.current || hintRevealed,_pedagogy:analysis}]);
    setLearningProfile(prev=>({...prev,totalChallenges:prev.totalChallenges+1,
      bloomLevels:{...prev.bloomLevels,[analysis.bloomLevel]:(prev.bloomLevels[analysis.bloomLevel]||0)+1},
      competencies:{...prev.competencies,[analysis.competency]:(prev.competencies[analysis.competency]||0)+1},
      themes:{...prev.themes,[analysis.theme]:(prev.themes[analysis.theme]||0)+1},
      books:{...prev.books,[analysis.book]:(prev.books[analysis.book]||0)+1}}));
  };
  const nextSession = () => { setSessionVersion(v=>v+1); restartCurrentGame(); };
  const canAnswer = !pausedRef.current && !gameOver && !feedback && (isPracticeMode || readyToAnswer || gameMode==='bible-rosco' || gameMode==='guess-the-phrase');

  if (!gameMode || challenges.length === 0) {
    return <main className="max-w-lg mx-auto p-6 space-y-4"><h1 className="text-2xl font-bold">{('Elige una actividad para comenzar')}</h1><p>{('No hay desafíos disponibles con esta selección. Puedes elegir otra actividad.')}</p><Button onClick={() => router.push('/setup')}>{('Elegir actividad')}</Button></main>;
  }

  const handleNextTurn = () => {
    submittedRef.current = false;
    setTimeLeft(roundTime);
    setFeedback(null);
    setAnswer('');
    setLetterInput('');
    setHintRevealed(false);
    setWsSelected([]);
    setWsFound([]);
    setClassItemIndex(0);
    
    const nextChallengeIndex = currentChallengeIndex + 1;
    
    if (nextChallengeIndex >= challenges.length) {
        setGameOver(true);
    } else {
        setCurrentChallengeIndex(nextChallengeIndex);
        if (teams.length > 0) {
          setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
        }
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
      if (submittedRef.current || pausedRef.current || gameOver) return;
      submittedRef.current = true;
      if(timerRef.current) clearInterval(timerRef.current);
      
      recordResult(challenge, isCorrect && !attemptHadError.current);

      if (isCorrect) {
          eventBus.emit('QUESTION_ANSWERED', { isCorrect, mode: gameMode });
          eventBus.emit('CORRECT_ANSWER', { challenge: challenges[currentChallengeIndex], mode: gameMode });
          pluginManager.executeHook('onCorrectAnswer', { challenge: challenges[currentChallengeIndex], mode: gameMode });
          playSound('correct');
          setFeedback('correct');
          if(!isPracticeMode) updateScore(currentTeamIndex, 10);
      } else {
          eventBus.emit('QUESTION_ANSWERED', { isCorrect, mode: gameMode });
          eventBus.emit('WRONG_ANSWER', { challenge: challenges[currentChallengeIndex], mode: gameMode });
          pluginManager.executeHook('onIncorrectAnswer', { challenge: challenges[currentChallengeIndex], mode: gameMode });
          playSound('incorrect');
          setFeedback('incorrect');
          if(!isPracticeMode) {
              const livesLeft = updateLives(currentTeamIndex, -1);
              if (livesLeft <= 0 && !activeLesson && teams.length === 1) {
                  setGameOver(true);
              }
          }
      }
  };

  const submitAnswer = () => {
      if (!answer.trim() || !canAnswer) return;
      let isCorrect = false;
      if (gameMode === 'find-word') {
          isCorrect = answersMatch(answer, challenge.answer || '');
      } else if (gameMode === 'complete-phrase') {
          isCorrect = answersMatch(answer, challenge.fullPhrase || '');
      }
      handleAnswer(isCorrect);
  };

  // Bible Rosco logic helpers
  const startPlayingTurn = () => {
    if(roundReview) return;
    playSound('click');
    setIsTurnPaused(false);
  };

  const handleContinueFromComparison = () => {
    playSound('click');
    setShowComparison(false);
    setLastIncorrectWord(null);
    
    let nextTeamIdx = currentTeamIndex;
    let foundNext = false;
    
    for (let i = 1; i <= teams.length; i++) {
      const testIdx = (currentTeamIndex + i) % teams.length;
      const ans = teamRoscoAnswers[testIdx] || {};
      const time = teamTimeLeft[testIdx] ?? roundTime;
      const roscoLetters = challenges[testIdx]?.letters || challenges[0]?.letters || [];
      
      const keys = Object.keys(ans).map(Number);
      const isComplete = keys.length === roscoLetters.length && keys.every(k => ans[k] !== 'skipped');
      
      if (!isComplete && time > 0) {
        nextTeamIdx = testIdx;
        foundNext = true;
        break;
      }
    }
    
    if (foundNext) {
      setCurrentTeamIndex(nextTeamIdx);
      setTimeLeft(teamTimeLeft[nextTeamIdx] ?? roundTime);
      setIsTurnPaused(true);
    } else {
      setGameOver(true);
    }
  };

  const submitRoscoAnswer = () => {
    if (!answer.trim() || pausedRef.current || isTurnPaused || gameOver || feedback) return;

    const roscoLetters = challenges[currentTeamIndex]?.letters || challenges[0]?.letters || [];
    const activeIndex = teamActiveRoscoIndex[currentTeamIndex] || 0;
    const activeLetterChallenge = roscoLetters[activeIndex];
    if (!activeLetterChallenge) return;
    const responseKey = `${currentTeamIndex}:${activeIndex}`;
    if (answeredRosco.current.has(responseKey)) return;
    answeredRosco.current.add(responseKey);

    const isCorrect = [activeLetterChallenge.word, ...(activeLetterChallenge.acceptedAnswers || [])].some(expected => answersMatch(answer, expected));
    recordResult(activeLetterChallenge,isCorrect);
    usedHint.current=false;
    setHintRevealed(false);
    setHelpMessage('');
    
    const currentAnswers = teamRoscoAnswers[currentTeamIndex] || {};
    const nextAnswers = { ...currentAnswers, [activeIndex]: isCorrect ? 'correct' as const : 'incorrect' as const };
    const updatedAnswers = { ...teamRoscoAnswers, [currentTeamIndex]: nextAnswers };
    setTeamRoscoAnswers(updatedAnswers);

    if (isCorrect) {
      playSound('correct');
      if (!isPracticeMode) updateScore(currentTeamIndex, 10);
    } else {
      playSound('incorrect');
      setLastIncorrectWord({
        word: activeLetterChallenge.word,
        letter: activeLetterChallenge.letter,
        teamName: teams[currentTeamIndex]?.name || `Equipo ${currentTeamIndex + 1}`
      });
      if (!isPracticeMode) {
        const livesLeft = updateLives(currentTeamIndex, -1);
        if (livesLeft <= 0 && !activeLesson && teams.length === 1) {
          setGameOver(true);
        }
      }
    }

    const updatedTimes = { ...teamTimeLeft, [currentTeamIndex]: timeLeft };
    setTeamTimeLeft(updatedTimes);

    const keys = Object.keys(nextAnswers).map(Number);
    const isComplete = keys.length === roscoLetters.length && keys.every(k => nextAnswers[k] !== 'skipped');

    if (isCorrect) {
      if (isComplete) {
        setIsTurnPaused(true);
        const allFinished = teams.every((_, idx) => {
          const ans = updatedAnswers[idx] || {};
          const tTime = updatedTimes[idx] ?? roundTime;
          const k = Object.keys(ans).map(Number);
          const lettersForIdx = challenges[idx]?.letters || challenges[0]?.letters || [];
          const comp = k.length === lettersForIdx.length && k.every(x => ans[x] !== 'skipped');
          return comp || tTime <= 0;
        });
        
        if (allFinished) {
          setGameOver(true);
        } else {
          setIsTurnPaused(true);
          if (teams.length > 1) {
            setShowComparison(true);
          } else {
            setGameOver(true);
          }
        }
      } else {
        moveToNextRoscoLetter(nextAnswers, activeIndex);
      }
    } else {
      setIsTurnPaused(true);
      if (teams.length > 1) {
        setShowComparison(true);
      } else {
        if (isComplete || timeLeft <= 0) {
          setGameOver(true);
        } else {
          moveToNextRoscoLetter(nextAnswers, activeIndex);
        }
      }
    }
    
    setAnswer('');
  };

  const skipRoscoLetter = () => {
    if (pausedRef.current || isTurnPaused || gameOver || feedback) return;

    playSound('click');
    setLastIncorrectWord(null);
    const activeIndex = teamActiveRoscoIndex[currentTeamIndex] || 0;
    const currentAnswers = teamRoscoAnswers[currentTeamIndex] || {};
    const nextAnswers = { ...currentAnswers, [activeIndex]: 'skipped' as const };
    const updatedAnswers = { ...teamRoscoAnswers, [currentTeamIndex]: nextAnswers };
    setTeamRoscoAnswers(updatedAnswers);

    const updatedTimes = { ...teamTimeLeft, [currentTeamIndex]: timeLeft };
    setTeamTimeLeft(updatedTimes);

    moveToNextRoscoLetter(nextAnswers, activeIndex);
    const letters=challenges[currentTeamIndex]?.letters || [];
    const completedPass=letters.every((_:any,i:number)=>nextAnswers[i] !== undefined);
    setRoundReview(completedPass);
    setIsTurnPaused(completedPass || teams.length > 1);
    if (teams.length > 1) {
      setShowComparison(true);
    }
    setAnswer('');
  };

  const moveToNextRoscoLetter = (
    answersRecord: Record<number, 'correct' | 'incorrect' | 'skipped'>,
    startFromIdx: number
  ) => {
    const roscoLetters = challenges[currentTeamIndex]?.letters || challenges[0]?.letters || [];
    let nextIdx = (startFromIdx + 1) % roscoLetters.length;
    let found = false;
    
    for (let i = 0; i < roscoLetters.length; i++) {
      const idx = (startFromIdx + 1 + i) % roscoLetters.length;
      if (answersRecord[idx] === undefined || answersRecord[idx] === 'skipped') {
        nextIdx = idx;
        found = true;
        break;
      }
    }
    
    setTeamActiveRoscoIndex(prev => ({ ...prev, [currentTeamIndex]: nextIdx }));
  };

  const helpRoscoSyllable = () => {
    const roscoLetters = challenges[currentTeamIndex]?.letters || challenges[0]?.letters || [];
    const activeIndex = teamActiveRoscoIndex[currentTeamIndex] || 0;
    const activeLetterChallenge = roscoLetters[activeIndex];
    if (!activeLetterChallenge) return;
    
    playSound('click');
    const word = activeLetterChallenge.word;
    const syllable = word.substring(0, Math.min(3, Math.ceil(word.length / 2)));
    setHintRevealed(true); setHelpMessage('La palabra comienza con: ' + syllable);
  };

  const helpRoscoLength = () => {
    const roscoLetters = challenges[currentTeamIndex]?.letters || challenges[0]?.letters || [];
    const activeIndex = teamActiveRoscoIndex[currentTeamIndex] || 0;
    const activeLetterChallenge = roscoLetters[activeIndex];
    if (!activeLetterChallenge) return;
    
    playSound('click');
    setHintRevealed(true); setHelpMessage('Longitud de la palabra: ' + activeLetterChallenge.word.length + ' letras');
  };

  const helpRoscoDiscard = () => {
    const roscoLetters = challenges[currentTeamIndex]?.letters || challenges[0]?.letters || [];
    const activeIndex = teamActiveRoscoIndex[currentTeamIndex] || 0;
    const activeLetterChallenge = roscoLetters[activeIndex];
    if (!activeLetterChallenge) return;
    
    playSound('click');
    const word = activeLetterChallenge.word.toUpperCase();
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const unusedLetters = alphabet.split('').filter(l => !word.includes(l));
    const shuffled = shuffleArray(unusedLetters);
    const discarded = shuffled.slice(0, 3).join(', ');
    setHintRevealed(true); setHelpMessage('Letras que no forman parte de la palabra: ' + discarded);
  };

  // Word Search / Sopa de Letras logic helpers
  const handleCellClick = (r: number, c: number) => {
    if (!canAnswer || pausedRef.current) return;
    if (wsSelected.length !== 1) { setWsSelected([{r,c}]); return; }
    const start=wsSelected[0], dr=r-start.r, dc=c-start.c;
    if(!dr && !dc) { setWsSelected([]); return; }
    if(dr && dc && Math.abs(dr)!==Math.abs(dc)) { setWsSelected([{r,c}]);setHelpMessage('Marca el inicio y el final en una misma fila, columna o diagonal.');return; }
    const count=Math.max(Math.abs(dr),Math.abs(dc))+1;
    setWsSelected(Array.from({length:count},(_,i)=>({r:start.r+Math.sign(dr)*i,c:start.c+Math.sign(dc)*i})));
    setHelpMessage('');
  };

  const verifySelectedWord = () => {
    if (!canAnswer || !wsSelected.length) return;
    const selectedWord = wsSelected.map(cell => wsGrid[cell.r][cell.c]).join('');
    const reversedWord = [...selectedWord].reverse().join('');
    
    const foundWord = challenge.words.find((w: string) => {
      const normalizedW = normalizeGridWord(w);
      return normalizedW === selectedWord || normalizedW === reversedWord;
    });

    if (foundWord && wsFound.includes(foundWord)) { setHelpMessage('Ya encontraste esa palabra. Busca una pendiente.'); setWsSelected([]); return; }
    if (foundWord) {
      playSound('correct');
      const updatedFound = [...wsFound, foundWord];
      setWsFound(updatedFound);
      setWsSelected([]);

      
      if (updatedFound.length >= challenge.words.length) {
        handleAnswer(true);
      }
    } else {
      playSound('incorrect');
      attemptHadError.current=true;
      setHelpMessage('Revisa la selección y vuelve a intentarlo.');
      if (!isPracticeMode) {
        const livesLeft = updateLives(currentTeamIndex, -1);
        if (livesLeft <= 0 && !activeLesson && teams.length === 1) {
          setGameOver(true);
        }
      }
    }
  };

  const helpWsFirstLetter = () => {
    playSound('click');
    const remaining = challenge.words.filter((w: string) => !wsFound.includes(w));
    if (remaining.length > 0) {
      const word = remaining[0].toUpperCase();
      setHintRevealed(true); setHelpMessage('Una palabra pendiente comienza con ' + word[0] + '.');
    }
  };

  const helpWsDirection = () => {
    playSound('click');
    setHintRevealed(true); setHelpMessage('Busca de izquierda a derecha, de arriba abajo o en diagonal. Toca el inicio y el final de la palabra.');
  };

  const helpWsLength = () => {
    playSound('click');
    const remaining = challenge.words.filter((w: string) => !wsFound.includes(w));
    const lengths = remaining.map((w: string) => w.length).join(', ');
    setHintRevealed(true); setHelpMessage('Cantidad de letras de las palabras pendientes: ' + lengths);
  };

  // Classification logic helper
  const handleClassifySelect = (cat: string) => {
    if (!canAnswer || pausedRef.current) return;
    playSound('click');
    const items = challenge.items || [];
    const currentItem = items[classItemIndex];
    if (!currentItem) return;

    const isCorrect = cat === currentItem.category;
    
    if (isCorrect) {
      playSound('correct');

      
      const nextIdx = classItemIndex + 1;
      if (nextIdx >= items.length) {
        handleAnswer(true);
      } else {
        setClassItemIndex(nextIdx);
        setHintRevealed(false);
      }
    } else {
      playSound('incorrect');
      if (!isPracticeMode) {
        const livesLeft = updateLives(currentTeamIndex, -1);
        if (livesLeft <= 0 && !activeLesson && teams.length === 1) {
          setGameOver(true);
        }
      }
      attemptHadError.current=true;
      setHelpMessage('Esa categoría no corresponde. Puedes volver a intentarlo o pedir ayuda.');
    }
  };

  // Counseling logic helper
  const handleCounselingSelect = (idx: number) => {
    if (!canAnswer || pausedRef.current) return;
    playSound('click');
    if(submittedRef.current) return;
    submittedRef.current=true;
    setAnswer(challenge.options[idx]);
    setPlayedChallenges(prev=>[...prev,{...challenge,_reflection:true,_selectedOption:idx}]);
    setFeedback('correct'); // Estado de continuación; la interfaz lo presenta como reflexión, sin acierto ni nota.

  };

  const handleSelectOption = (opt: string) => {
    if (!canAnswer || pausedRef.current) return;
    playSound('click');
    const missingIndices = (challenge as any).missingIndices || [];
    const words = (challenge as any).words || [];
    const sortedIndices = [...missingIndices].sort((a, b) => a - b);
    const correctOption = sortedIndices.map((idx: number) => words[idx]).join(' ');

    const isCorrect = answersMatch(opt, correctOption);
    setAnswer(isCorrect ? challenge.fullPhrase : opt); 
    handleAnswer(isCorrect);
  };

  const handleGuessLetter = (inputLetter?: string) => {
    if (!canAnswer || pausedRef.current || submittedRef.current || letterLock.current) return;
    const targetLetter = inputLetter || letterInput;
    const letter = normalizeForValidation(targetLetter.toLowerCase());
    if (!/^[A-ZÑ]$/.test(letter) || guessedLetters.includes(letter)) return;
    letterLock.current=true;
    queueMicrotask(() => { letterLock.current=false; });

    playSound('click');
    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);
    setLetterInput('');

    const phrase = challenge.phrase || '';
    const cleanLetter = normalizeForValidation(letter);
    const inPhrase = normalizeForValidation(phrase).includes(cleanLetter);

    if (!inPhrase) {
        attemptHadError.current=true;
        playSound('incorrect');
        if(!isPracticeMode) {
            const livesLeft = updateLives(currentTeamIndex, -1);
            if (livesLeft <= 0 && !activeLesson && teams.length === 1) {
                setGameOver(true);
            }
        }
    } else {
        playSound('correct');
        const phraseLetters = [...new Set(normalizeForValidation(phrase).replace(/ /g, ''))];
        const revealedLetters = phraseLetters.filter(l => newGuessed.includes(l));
        if (revealedLetters.length === phraseLetters.length) {
            handleAnswer(true);
            return;
        }
    }
    if (teams.length > 1) {
      setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
    }
  };

  const handleGuessPhrase = () => {
      if (!canAnswer || pausedRef.current) return;
      const isCorrect = answersMatch(answer, challenge.phrase || '');
      handleAnswer(isCorrect);
  };

  const winner = teams.length > 0 
    ? teams.reduce((prev, current) => (prev.score > current.score) ? prev : current)
    : null;

  if (gameOver) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 pt-24 relative overflow-hidden pb-12">
            <div className="sr-only" aria-live="polite" aria-atomic="true">{ariaMessage}</div>
            {/* Glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

            <GameHeader />
            <Card className="w-full max-w-xl text-center bg-slate-900/80 backdrop-blur-md border-primary/30 shadow-2xl rounded-3xl overflow-hidden mt-8 z-10">
                <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />
                <CardHeader>
                    <CardTitle className="font-headline text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-yellow-500 flex items-center justify-center gap-2">
                      <Trophy className="w-8 h-8 text-amber-400 fill-current" />
                      {isCancelled ? t.summary.title_cancelled : t.summary.title_completed}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                    {activeLesson ? (
                      <section className="space-y-3"><h3>Recorrido de repaso completado</h3><p>Las entregas se realizan desde Mis tareas, dentro de tu cuenta.</p><Button onClick={()=>router.push('/classroom')}>Ir a mis tareas</Button></section>
                    ) : (
                      // Standard participation summary screen
                      <div className="space-y-6">
                        {!isPracticeMode && teams.length > 1 && winner && !isCancelled ? (
                          <>
                            <h3 className="text-2xl font-bold text-amber-300">{teams.filter(team=>team.score===winner.score).length>1 ? 'Empate' : `${t.game.winner} ${winner.name}`} </h3>
                            <div className="space-y-2 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                                {[...teams].sort((a,b) => b.score - a.score).map(team => (
                                    <p key={team.name} className="text-lg flex justify-between font-semibold">
                                      <span className="text-slate-400">{team.name}</span>
                                      <span className="text-amber-400">{team.score} {t.game.points}</span>
                                    </p>
                                ))}
                            </div>
                          </>
                        ) : (
                          <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800">
                            {!isPracticeMode && teams.length > 0 && (
                              <p className="text-2xl text-amber-400 font-bold">
                                {t.summary.points_obtained}: {teams[0].score} pts
                              </p>
                            )}
                            <p className="text-slate-400 text-sm mt-1">
                              {t.summary.challenges_solved}: {playedChallenges.filter(pc => pc._isCorrect !== undefined || pc._reflection).length}
                            </p>
                          </div>
                        )}

                        {/* Played verses log / Bitácora de Versículos */}
                        {playedChallenges.length > 0 && (
                          <div className="space-y-3 text-left">
                            <div className="border-t border-slate-850 pt-4">
                              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <BookOpen className="w-4 h-4 text-sky-400" />
                                {t.summary.verse_log}
                              </h4>
                              <p className="text-xs text-slate-500 mb-3">
                                {t.summary.verse_log_desc}
                              </p>
                            </div>
                            
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                              {playedChallenges.map((pc, idx) => {
                                const fullText = pc.fullPhrase || pc.phrase || pc.answer || pc.word || pc.title || pc.theme;
                                return (
                                  <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 hover:border-amber-500/30 transition-all duration-200">
                                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm mb-1.5">
                                      <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                                      <span>{pc.reference || (('Desafío ' + (idx + 1)))}</span>
                                    </div>
                                    <p className="text-slate-300 text-xs italic pl-2.5 border-l-2 border-slate-700">
                                      {pc.answer ? (('Palabra repasada: ')) : ''}{fullText}
                                    </p>

                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {!activeLesson && gameMode !== 'counseling-practical' && <section className="mt-6 space-y-3 border-t border-slate-700 pt-4 text-left">
                          <h3 className="font-bold">Tu próximo paso</h3><p>{sessionProgress.text}</p>
                          {sessionProgress.ready && difficulty !== 'avanzado' && <Button onClick={()=>{setDifficulty(difficulty==='principiante'?'discipulo':'avanzado');nextSession();}}>Probar el siguiente nivel</Button>}
                          <p className="text-sm text-slate-300">El nivel es una elección de práctica, no una medida de tu fe.</p>
                        </section>}

                      </div>
                    )}

                    <p className="text-sm text-slate-300 mt-4">Se prioriza el contenido pendiente. Cuando se termine el catálogo, continuarás con repasos.</p>
                    <Button variant="outline" onClick={restartCurrentGame} className="mt-3">Repasar estos desafíos</Button>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button onClick={nextSession} size="lg" className="flex-grow font-bold bg-amber-500 text-slate-950 hover:bg-amber-600 rounded-xl py-6">
                        Continuar con otros desafíos
                      </Button>
                      <Button onClick={() => { resetGame(); router.push('/') }} variant="outline" size="lg" className="flex-grow font-semibold border-slate-800 text-slate-300 hover:bg-slate-800 rounded-xl py-6">
                        {t.summary.finish_button}
                      </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }

  const totalChallenges = gameMode === 'bible-rosco' ? (challenges[currentTeamIndex]?.letters || challenges[0]?.letters || []).length : challenges.length;
  const displayIndex = gameMode === 'bible-rosco' ? (teamActiveRoscoIndex[currentTeamIndex] || 0) : currentChallengeIndex;
  const completedCount = gameMode === 'bible-rosco' ? Object.values(teamRoscoAnswers[currentTeamIndex] || {}).filter(value => value !== 'skipped').length : currentChallengeIndex + (feedback ? 1 : 0);
  const progress = (completedCount / Math.max(1, totalChallenges)) * 100;
  const currentLevel = (challenge as any).level;
  const fullAnswer = (challenge as any).fullAnswer;

  const renderCircularWheel = (teamIdx: number, size: 'large' | 'small' = 'large') => {
    const roscoLetters = challenges[teamIdx]?.letters || challenges[0]?.letters || [];
    const activeIndex = teamActiveRoscoIndex[teamIdx] || 0;
    const answers = teamRoscoAnswers[teamIdx] || {};
    
    const correctCount = Object.values(answers).filter(v => v === 'correct').length;
    const teamName = teams[teamIdx]?.name || `Equipo ${teamIdx + 1}`;
    const timeLeftForTeam = teamTimeLeft[teamIdx] ?? roundTime;
    
    const isLarge = size === 'large';
    const containerClasses = isLarge 
      ? "relative aspect-square w-full max-w-[280px] xs:max-w-[320px] md:max-w-[380px] mx-auto my-6"
      : "relative aspect-square w-full max-w-[160px] xs:max-w-[190px] md:max-w-[220px] mx-auto my-3";
      
    const isSky = teamIdx === 1;
    const teamColorText = isSky ? 'text-sky-300' : 'text-amber-300';
    const centerSizeClasses = isLarge
      ? `w-[60%] h-[60%] text-center flex flex-col items-center justify-center bg-slate-900/90 rounded-full border shadow-xl transition-all duration-300 ${isSky ? 'border-sky-500/25 shadow-sky-500/5' : 'border-amber-500/25 shadow-amber-500/5'}`
      : `w-[62%] h-[62%] text-center flex flex-col items-center justify-center bg-slate-900/95 rounded-full border shadow-md transition-all duration-300 ${isSky ? 'border-sky-500/25 shadow-sky-500/5' : 'border-amber-500/25 shadow-amber-500/5'}`;

    const letterSizeClasses = isLarge
      ? "w-8 h-8 md:w-9 md:h-9 text-xs md:text-sm font-extrabold"
      : "w-5 h-5 md:w-6 md:h-6 text-[9px] md:text-[10px] font-extrabold";

    return (
      <div className={containerClasses}>
        {/* Central Card Info */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div className={centerSizeClasses}>
            {isLarge ? (
              isTurnPaused ? (
                <div className="space-y-1.5 p-2">
                  <p className={`text-[10px] md:text-xs font-black uppercase tracking-wide truncate max-w-[140px] ${teamColorText}`}>{teamName}</p>
                  <Button 
                    disabled={roundReview}
                    onClick={startPlayingTurn}
                    className={`font-bold text-slate-950 rounded-full py-1.5 px-4 shadow-lg animate-pulse text-xs ${
                      isSky ? 'bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600' : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600'
                    }`}
                  >
                    Comenzar
                  </Button>
                  <p className="text-[9px] text-slate-500">{isPracticeMode ? (('Sin tiempo')) : `${timeLeftForTeam}s`}</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  <p className={`text-[10px] md:text-xs font-black uppercase tracking-wide truncate max-w-[140px] ${teamColorText}`}>{teamName}</p>
                  <p className={`text-3xl md:text-4xl font-headline font-black tracking-tight leading-none ${teamColorText}`}>
                    {isPracticeMode ? (('Sin tiempo')) : `${timeLeft}s`}
                  </p>
                  <div className={`flex items-center justify-center gap-1 text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isSky ? 'text-sky-300 bg-sky-500/10 border-sky-500/20' : 'text-green-400 bg-green-500/10 border-green-500/20'
                  }`}>
                    <span>{correctCount} aciertos</span>
                  </div>
                </div>
              )
            ) : (
              // Small view (comparison mode)
              <div className="space-y-0.5 p-1">
                <p className={`text-[9px] font-black uppercase truncate max-w-[80px] ${teamColorText}`}>{teamName}</p>
                <p className={`text-sm font-bold ${teamColorText}`}>{timeLeftForTeam}s</p>
                <p className={`text-[8px] font-semibold ${isSky ? 'text-sky-300' : 'text-green-400'}`}>{correctCount} aciertos</p>
              </div>
            )}
          </div>
        </div>

        {/* Letters Ring */}
        {roscoLetters.map((item: any, idx: number) => {
          const status = answers[idx];
          let colorClass = "border-slate-800 bg-slate-900/60 text-slate-400";
          
          if (isLarge && idx === activeIndex && !isTurnPaused) {
            colorClass = isSky
              ? "border-sky-300 bg-sky-500 text-slate-950 ring-4 ring-sky-400/50 scale-120 z-20 font-black animate-pulse shadow-[0_0_18px_rgba(14,165,233,0.7)]"
              : "border-amber-300 bg-amber-500 text-slate-950 ring-4 ring-amber-400/50 scale-120 z-20 font-black animate-pulse shadow-[0_0_18px_rgba(245,158,11,0.7)]";
          } else if (status === 'correct') {
            colorClass = "border-green-500/30 bg-green-500 text-slate-100";
          } else if (status === 'incorrect') {
            colorClass = "border-red-500/30 bg-red-500 text-slate-100";
          } else if (status === 'skipped') {
            colorClass = "border-yellow-500/30 bg-yellow-500 text-slate-950";
          }

          // Trig positioning
          const angle = (idx * 360) / roscoLetters.length - 90;
          const radians = (angle * Math.PI) / 180;
          const radius = 41;
          const x = 50 + radius * Math.cos(radians);
          const y = 50 + radius * Math.sin(radians);

          return (
            <span 
              key={idx} 
              className={`absolute rounded-full border flex items-center justify-center shadow-md select-none transition-all duration-300 ${colorClass} ${letterSizeClasses}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {item.letter}
            </span>
          );
        })}
      </div>
    );
  };

  const renderBibleRosco = () => {
    const roscoLetters = challenges[currentTeamIndex]?.letters || challenges[0]?.letters || [];
    const activeIndex = teamActiveRoscoIndex[currentTeamIndex] || 0;
    const activeLetterChallenge = roscoLetters[activeIndex];
    
    if (showComparison) {
      return (
        <div className="w-full space-y-6 animate-scroll-reveal text-center">
          <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            {('Comparación de Equipos')}
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto p-4 bg-slate-900/50 rounded-3xl border border-slate-800 shadow-xl items-center">
            {teams.map((_, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {renderCircularWheel(idx, 'small')}
              </div>
            ))}
          </div>
          
          {lastIncorrectWord && (
            <div className="max-w-md mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center space-y-1">
              <p className="text-xs font-bold text-red-400 uppercase tracking-wider">
                {('Respuesta Incorrecta')}
              </p>
              <p className="text-sm text-slate-300">
                {(`La respuesta correcta de ${lastIncorrectWord.teamName} para la letra "${lastIncorrectWord.letter}" era:`)}
              </p>
              <p className="text-xl font-black text-red-400 tracking-wide uppercase">
                {lastIncorrectWord.word}
              </p>
            </div>
          )}

          <div className="max-w-md mx-auto pt-4">
            <Button 
              onClick={handleContinueFromComparison} 
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold h-14 rounded-xl text-base shadow-lg transition-all"
            >
              {('Continuar al Siguiente Turno')}
            </Button>
          </div>
        </div>
      );
    }

    if (!activeLetterChallenge) return null;

    return (
      <div className="w-full space-y-6 animate-scroll-reveal">
        <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
          {t.game.rosco_title || 'El Círculo de la Palabra'}
        </div>

        {renderCircularWheel(currentTeamIndex, 'large')}

        {isTurnPaused ? (
          <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-850 max-w-xl mx-auto text-center space-y-3">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              {('Turno de:')} {teams[currentTeamIndex]?.name}
            </p>
            <p className="text-base text-slate-300">
              {('Presiona Comenzar para ver la pista. Puedes pasar una letra y volver después.')}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 max-w-xl mx-auto space-y-4 text-left">
              <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-wider">
                <span>{activeLetterChallenge.type === 'starts' ? (('Empieza con')) : (('Contiene'))} "{activeLetterChallenge.letter}"</span>
                {activeLetterChallenge.reference && <span className="text-amber-500/80">{activeLetterChallenge.reference}</span>}
              </div>
              <p className="text-xl font-semibold leading-relaxed text-slate-200">
                "{activeLetterChallenge.definition}"
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-3">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && submitRoscoAnswer()}
                aria-label={("Tu respuesta")}
                placeholder={t.game.input_placeholder}
                className="text-center text-lg h-14 border-slate-800 bg-slate-950 focus:border-amber-500/50 text-slate-200"
              />

              <div className="grid grid-cols-2 gap-2">
                <Button disabled={!answer.trim()} onClick={submitRoscoAnswer} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold h-12 rounded-xl text-sm">
                  {t.game.submit_button}
                </Button>
                <Button onClick={skipRoscoLetter} variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-850 h-12 rounded-xl text-sm">
                  {t.game.pasapalabra || 'Pasapalabra'}
                </Button>
              </div>

              <div className="flex gap-2 justify-center">
                {difficulty === 'principiante' && (
                  <Button onClick={helpRoscoSyllable} variant="ghost" className="text-xs text-sky-400 hover:text-sky-300">
                    💡 {t.game.reveal_syllable || 'Revelar Sílaba'}
                  </Button>
                )}
                {difficulty !== 'principiante' && (
                  <Button onClick={helpRoscoLength} variant="ghost" className="text-xs text-sky-400 hover:text-sky-300">
                    💡 {t.game.show_len || 'Ver Longitud'}
                  </Button>
                )}
                {difficulty === 'avanzado' && (
                  <Button onClick={helpRoscoDiscard} variant="ghost" className="text-xs text-sky-400 hover:text-sky-300">
                    💡 {t.game.letters_discard || 'Descartar Letras'}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderWordSearchGame = () => {
    const size = wsGrid.length;
    return (
      <div className="w-full space-y-5 animate-scroll-reveal">
        <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
          {t.game.word_search || 'Sopa de Letras'} - {challenge.theme}
        </div>

        <p className="text-sm text-slate-300">Toca la primera y la última letra de una palabra, luego pulsa Verificar. Desliza la cuadrícula si no cabe completa.</p>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center max-w-3xl mx-auto">
          <div className="p-2 bg-slate-950/40 border border-slate-800 rounded-3xl shadow-inner w-full overflow-x-auto">
            <div 
              className="grid gap-1"
              style={{ gridTemplateColumns: `repeat(${size}, 2.75rem)` }}
            >
              {wsGrid.map((row, rIdx) => 
                row.map((char, cIdx) => {
                  const isSelected = wsSelected.some(cell => cell.r === rIdx && cell.c === cIdx);
                  return (
                    <button
                      key={`${rIdx}-${cIdx}`}
                      aria-label={`${char}, ${("fila")} ${rIdx + 1}, ${("columna")} ${cIdx + 1}`}
                      aria-pressed={isSelected}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      className={`w-11 h-11 flex items-center justify-center rounded-lg text-sm font-extrabold border transition-all duration-150 ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500 text-slate-950 scale-95 shadow-md'
                          : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {char}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-855 w-full md:w-64 space-y-4 text-left animate-scroll-reveal">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {('Palabras a buscar:')}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {challenge.words.map((w: string, idx: number) => {
                const found = wsFound.includes(w);
                const hint = challenge.hints ? challenge.hints[idx] : null;
                return (
                  <div key={idx} className="text-left">
                    <span className={`text-sm font-semibold transition-all ${
                      found ? 'text-green-500 line-through opacity-50' : 'text-slate-200'
                    }`}>
                      {w}
                    </span>
                    {hint && !found && (
                      <p className="text-[10px] text-sky-300/80 italic mt-0.5">{hint}</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-850">
              <div className="text-xs text-slate-500 font-semibold truncate">
                {('Selección:')} <span className="text-amber-400 font-mono font-bold text-sm tracking-widest">{wsSelected.map(cell => wsGrid[cell.r][cell.c]).join('')}</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={verifySelectedWord} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex-grow text-xs h-10 rounded-xl" disabled={wsSelected.length === 0}>
                  Verificar
                </Button>
                <Button onClick={() => setWsSelected([])} variant="outline" className="border-slate-800 text-slate-400 hover:text-white text-xs h-10 rounded-xl px-2" disabled={wsSelected.length === 0}>
                  Limpiar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-300 break-words">Referencias del catálogo: {challenge.references?.join('; ')}</p>
        <div className="flex gap-2 justify-center max-w-sm mx-auto">
          {difficulty === 'principiante' && (
            <Button onClick={helpWsFirstLetter} variant="ghost" className="text-xs text-sky-400 hover:text-sky-300">
              💡 {('Primera Letra')}
            </Button>
          )}
          {difficulty === 'discipulo' && (
            <Button onClick={helpWsDirection} variant="ghost" className="text-xs text-sky-400 hover:text-sky-300">
              💡 {('Dirección')}
            </Button>
          )}
          {difficulty === 'avanzado' && (
            <Button onClick={helpWsLength} variant="ghost" className="text-xs text-sky-400 hover:text-sky-300">
              💡 {t.game.show_len || 'Ver Longitud'}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderClassificationGame = () => {
    const items = challenge.items || [];
    const currentItem = items[classItemIndex];
    if (!currentItem) return null;

    return (
      <div className="w-full space-y-6 animate-scroll-reveal max-w-xl mx-auto">
        <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
          {t.game.classify || 'Clasificación'} - {challenge.theme}
        </div>

        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
          {('Item')} {classItemIndex + 1} {('de')} {items.length}
        </div>

        <div className="bg-slate-950/60 p-8 rounded-3xl border border-slate-800 shadow-inner space-y-4">
          <h3 className="text-3xl font-extrabold tracking-wide text-amber-400">
            {currentItem.name}
          </h3>
          {hintRevealed && currentItem.hint && (
            <p className="text-sm text-sky-300 italic">
              {currentItem.hint}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {challenge.categories.map((cat: string, idx: number) => (
            <Button
              key={idx}
              onClick={() => handleClassifySelect(cat)}
              className="bg-slate-900 border border-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold p-6 h-auto rounded-xl text-sm transition-all"
            >
              {cat}
            </Button>
          ))}
        </div>

        {currentItem.hint && !hintRevealed && (
          <Button onClick={() => setHintRevealed(true)} variant="ghost" className="text-xs text-sky-400 hover:text-sky-300">
            💡 {('Mostrar Pista')}
          </Button>
        )}
      </div>
    );
  };

  const renderCounselingGame = () => {
    return (
      <div className="w-full space-y-5 animate-scroll-reveal max-w-xl mx-auto text-left">
        <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
          {t.game.case_study || 'Caso de Estudio'} - {challenge.title}
        </div>

        <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 space-y-4">
          <p className="text-sm font-bold text-sky-300">Lectura bíblica para reflexionar</p>
          <p className="text-xs text-slate-400">Resumen y preguntas educativos, no citas textuales. Lee {challenge.biblicalSupport} en tu Biblia.</p>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed italic">
            {challenge.description}
          </p>
          <div className="border-t border-slate-800/40 pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              {('Pregunta:')}
            </h4>
            <p className="text-base font-bold text-slate-100">
              {challenge.question}
            </p>
          </div>
        </div>

        {hintRevealed && (
          <div className="bg-sky-500/5 border border-sky-500/10 p-4 rounded-xl text-xs text-sky-400 font-medium">
            💡 Lectura de apoyo: {challenge.suggestedVerse}
          </div>
        )}

        <div className="space-y-2.5">
          {challenge.options.map((opt: string, idx: number) => (
            <button
              key={idx}
              onClick={() => handleCounselingSelect(idx)}
              className="w-full text-left bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold p-4 rounded-xl text-xs sm:text-sm transition-all leading-normal shadow-sm flex gap-3 hover:border-amber-500/40"
            >
              <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{opt}</span>
            </button>
          ))}
        </div>

        {!hintRevealed && (
          <div className="flex justify-center mt-2">
            <Button onClick={() => setHintRevealed(true)} variant="ghost" className="text-xs text-sky-400 hover:text-sky-300">
              💡 {('Ver Versículo de Apoyo')}
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderGuessThePhrase = () => {
    const phrase = (challenge.phrase || '').toUpperCase();
    const displayedPhrase = phrase.split('').map((char: string) => {
        if (!/[A-ZÁÉÍÓÚÜÑ]/.test(char)) return char;
        if (guessedLetters.includes(normalizeForValidation(char))) return char;
        return '_';
    }).join('');

    const category = ('Descubrir la Frase');

    return (
        <div className="w-full space-y-4 animate-scroll-reveal">
            {/* Category badge */}
            <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider mb-1">
              {category}
            </div>

            {/* Hint reveal system for guess-the-phrase */}
            {!hintRevealed ? (
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs text-slate-500 italic">{('Intenta resolver sin pista primero...')}</p>
                <Button onClick={() => setHintRevealed(true)} size="sm" variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs">
                  {('💡 Ver Pista')}
                </Button>
              </div>
            ) : (
              <p className="text-sm text-sky-300 font-medium tracking-wide">{challenge.hint}</p>
            )}
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest font-mono text-amber-400 bg-slate-950/80 p-4 rounded-xl border border-slate-800/60 shadow-inner">
                {displayedPhrase.split(' ').map((word: string, i: number) => <span key={i} className="inline-block mr-4">{word}</span>)}
            </h2>
            
            {/* Virtual Keyboard Grid (Mobile Friendly, No native keyboard popup) */}
            <div className="grid grid-cols-5 min-[360px]:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5 justify-center max-w-lg mx-auto my-3 p-2 bg-slate-950/30 border border-slate-850 rounded-2xl">
              {alphabetKeys.map(letter => {
                const isGuessed = guessedLetters.includes(normalizeForValidation(letter.toLowerCase()));
                const isCorrect = isGuessed && normalizeForValidation(challenge.phrase || '').includes(normalizeForValidation(letter.toLowerCase()));
                return (
                  <Button
                    key={letter}
                    variant="outline"
                    onClick={() => handleGuessLetter(letter)}
                    disabled={isGuessed || !!feedback}
                    className={`min-h-11 min-w-11 text-sm font-bold rounded-lg border transition-all p-0 ${
                      isGuessed 
                        ? isCorrect 
                          ? 'bg-green-500/20 border-green-500 text-green-400' 
                          : 'bg-red-500/10 border-red-500/30 text-red-500/60'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-amber-500 hover:text-slate-950'
                    }`}
                  >
                    {letter}
                  </Button>
                );
              })}
            </div>

             <div className="flex gap-2 justify-center max-w-md mx-auto">
                 <Input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleGuessPhrase()}
                      aria-label={("Frase completa")}
                      placeholder={t.game.phrase_placeholder}
                      className="text-center text-sm h-12 border-slate-800 bg-slate-950 focus:border-amber-500/50"
                      disabled={!!feedback}
                    />
                 <Button onClick={handleGuessPhrase} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 rounded-xl text-xs" disabled={!answer || !!feedback}>
                   {t.game.phrase_button}
                 </Button>
            </div>
            
            {!isPracticeMode && (
                <div className="flex items-center justify-center gap-1.5 mt-1">
                   {Array.from({ length: 5 }).map((_, i) => (
                        <Heart key={i} className={`w-5 h-5 ${i < (currentTeam?.lives ?? 0) ? 'text-red-500 fill-current' : 'text-slate-700'}`}/>
                    ))}
                </div>
            )}
        </div>
    );
  };

  const renderDefaultGame = () => {
    // If complete-phrase, render Multiple Choice puzzle options
    if (gameMode === 'complete-phrase') {
      const category = ('Completar Versículo');
      return (
        <div className="w-full space-y-5 animate-scroll-reveal">
          {/* Category badge */}
          <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            {category}
          </div>

          {/* Hint reveal system for complete-phrase */}
          {!hintRevealed ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-slate-500 italic">{('Intenta resolver sin pista primero...')}</p>
              <Button onClick={() => setHintRevealed(true)} size="sm" variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs">
                {('💡 Ver Pista')}
              </Button>
            </div>
          ) : (
            <p className="text-sm text-sky-300 font-medium tracking-wide">{challenge.hint}</p>
          )}
          <h2 className="text-2xl md:text-3xl font-bold leading-relaxed text-amber-400 bg-slate-950/60 py-6 px-4 rounded-2xl border border-slate-800/60 shadow-inner max-w-xl mx-auto">
              {challenge.question}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
            {completePhraseOptions.map((opt, idx) => (
              <Button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                disabled={!!feedback}
                className="bg-slate-900/80 border border-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-semibold p-6 h-auto rounded-xl text-sm transition-all shadow-md"
              >
                {opt.split(' ').join(', ')}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    // Default "Find the Word" mode with interactive syllable/letter tapping buttons
    const category = 'Ordena la palabra';
    const isAvanzado = difficulty === 'avanzado';

    return (
       <div className="w-full space-y-4 animate-scroll-reveal">
          {/* Category badge */}
          <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            {category}
          </div>

          {/* Hint reveal system */}
          {!hintRevealed ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-slate-500 italic">{('Intenta resolver sin pista primero...')}</p>
              <Button onClick={() => { setHintRevealed(true); }} size="sm" variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs">
                {('💡 Ver Pista')}
              </Button>
            </div>
          ) : (
            <p className="text-sm text-sky-300 font-medium tracking-wide">
              {challenge.hint}
            </p>
          )}
          
          <h2 className="text-3xl md:text-5xl font-bold break-words tracking-wide font-headline text-amber-400 bg-slate-950/60 py-6 px-4 rounded-2xl border border-slate-800/60 shadow-inner">
              {challenge.question}
          </h2>
          
          <p className="text-base text-slate-200">{('Toca los grupos de letras en orden, o escribe tu respuesta. Después pulsa Enviar respuesta.')}</p>
          {/* Interactive syllable/letter tapping selectors */}
          <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto my-2">
            {questionParts.map((part: string, idx: number) => (
              <Button
                key={idx}
                variant="outline"
                onClick={() => {
                  playSound('click');
                  setAnswer(prev => prev + part);
                }}
                className="border-slate-800 bg-slate-900/60 hover:bg-amber-500 hover:text-slate-950 font-bold rounded-xl text-base px-4 py-2"
                disabled={!!feedback}
              >
                {part}
              </Button>
            ))}
          </div>
          
          <div className="max-w-md mx-auto space-y-3">
            <div className="flex gap-2">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                aria-label={("Tu respuesta")}
                placeholder={t.game.input_placeholder}
                className="text-center text-lg h-14 border-slate-800 bg-slate-950 focus:border-amber-500/50 text-slate-200"
                disabled={!!feedback}
              />
              <Button 
                variant="outline" 
                onClick={() => { playSound('click'); setAnswer(''); }}
                className="border-slate-800 text-slate-400 hover:text-white rounded-xl px-3 flex items-center gap-1"
                disabled={!answer || !!feedback}
              >
                <RotateCcw className="w-4 h-4" />
                <span>{("Borrar")}</span>
              </Button>
            </div>
            
            <Button onClick={submitAnswer} size="lg" className="w-full text-base font-bold bg-amber-500 text-slate-950 hover:bg-amber-600 rounded-xl py-6" disabled={!answer || !!feedback}>
              {t.game.submit_button}
            </Button>
          </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-2 pt-20 md:p-4 md:pt-24 relative overflow-x-hidden">
      {/* Dynamic background glow depending on active team - expanded & more intense */}
      <div className={`absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none transition-all duration-1000 ${
        currentTeamIndex === 1 ? 'bg-sky-500/15' : 'bg-amber-500/15'
      }`} />
      {saveFailed&&<p role="alert" className="p-3 text-amber-200">No pudimos guardar en este navegador. Mantén esta página abierta para conservar el recorrido.</p>}
      <GameHeader initialPaused={!!saved} onPauseChange={(paused) => { pausedRef.current = paused; setPaused(paused); }} onCancel={() => { setIsCancelled(true); setGameOver(true); }} />
      
      <div className="z-10 max-w-6xl mx-auto w-full px-2 space-y-3">
        <p className="text-sm text-slate-300">{gameMode === 'complete-phrase' || gameMode === 'guess-the-phrase' ? `Pasajes del catálogo ${bibleVersion.toUpperCase()}. Las opciones no son citas completas.` : 'Actividad de aprendizaje con referencias bíblicas. Las consignas y explicaciones no son citas textuales.'}</p>
        <p className="text-sm text-slate-300">{gameRestarted > initialRestart.current || history[identity(gameMode === 'bible-rosco' ? challenges[currentTeamIndex]?.letters[teamActiveRoscoIndex[currentTeamIndex] || 0] || {} : challenge)] ? 'Repaso: ya conociste este contenido. Practica con calma.' : 'Contenido pendiente en tu recorrido.'} {!isPracticeMode && 'Cada desafío completado suma 10 puntos; en el recorrido por letras, cada respuesta suma 10.'}</p>
        {!isPracticeMode && gameMode !== 'bible-rosco' && gameMode !== 'guess-the-phrase' && !readyToAnswer && !feedback && <div className="p-4 rounded-xl bg-slate-800"><p>Lee la consigna con calma. El reloj comenzará cuando estés listo.</p><Button className="mt-2" onClick={()=>setReadyToAnswer(true)}>Estoy listo: comenzar tiempo</Button></div>}
        {helpMessage && <p role="status" className="p-3 bg-sky-950 border border-sky-700 rounded-xl">{helpMessage}</p>}
        {gameMode==='bible-rosco' && lastIncorrectWord && teams.length===1 && <p role="status">Respuesta para revisar: <strong>{lastIncorrectWord.word}</strong>. Puedes continuar a tu ritmo.</p>}
        {roundReview && <section className="p-4 rounded-xl border border-amber-400 space-y-3"><h2 className="font-bold">Terminaste una vuelta</h2><p>Quedan respuestas pendientes. Puedes revisarlas o terminar por hoy.</p><div className="flex flex-wrap gap-3"><Button onClick={()=>{setRoundReview(false);setTeamRoscoAnswers(prev=>({...prev,[currentTeamIndex]:Object.fromEntries(Object.entries(prev[currentTeamIndex]||{}).filter(([,v])=>v!=='skipped'))}));setIsTurnPaused(false);}}>Revisar pendientes</Button><Button variant="outline" onClick={()=>{setRoundReview(false);setIsCancelled(true);setGameOver(true);}}>Terminar y ver resumen</Button></div></section>}
      </div>
      <div className="flex-grow flex flex-col lg:flex-row lg:gap-4 z-10 max-w-6xl mx-auto w-full min-w-0 mt-4 pb-6">
        
        {/* Main Game Panel */}
        <main className="flex-grow min-w-0 flex flex-col pb-4 lg:pb-0 lg:w-2/3">
          <Card className={`flex-grow flex flex-col bg-slate-900/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 border-2 ${
            currentTeamIndex === 1 
              ? 'border-sky-500 shadow-[0_0_35px_rgba(14,165,233,0.35)]' 
              : 'border-amber-500 shadow-[0_0_35px_rgba(245,158,11,0.35)]'
          }`}>
            <CardHeader className={`p-4 border-b transition-colors duration-500 ${
              currentTeamIndex === 1 
                ? 'bg-sky-500/15 border-sky-500/30 text-sky-100' 
                : 'bg-amber-500/15 border-amber-500/30 text-amber-100'
            }`}>
              <div className="flex flex-wrap gap-3 items-center justify-between text-slate-300">
                  <div className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full animate-pulse shadow-md ${
                        currentTeamIndex === 1 ? 'bg-sky-400 shadow-sky-400/40' : 'bg-amber-400 shadow-amber-400/40'
                      }`} />
                      <span className={`font-black text-lg tracking-wide uppercase ${
                        currentTeamIndex === 1 ? 'text-sky-300' : 'text-amber-300'
                      }`}>{teams[currentTeamIndex]?.name}</span>
                  </div>
                {!isPracticeMode && gameMode !== 'guess-the-phrase' && (
                    <div className="flex items-center gap-2 text-lg font-bold text-slate-300">
                        <Clock className={`w-5 h-5 ${currentTeamIndex === 1 ? 'text-sky-400' : 'text-amber-400'}`}/>
                        <span>{timeLeft}s</span>
                    </div>
                )}
                {!isPracticeMode && <span className="text-sm">{currentTeam?.lives ?? 0} {('oportunidades')}</span>}
                {currentLevel && gameMode === 'find-word' && (
                    <div className="flex items-center gap-2">
                        {currentLevel === 1 ? <Star className="w-5 h-5 text-yellow-400 fill-current"/> : <Brain className="w-5 h-5 text-purple-400 fill-current"/>}
                        <span className="font-semibold text-slate-300 text-sm">Nivel {difficulty === 'principiante' ? 'Principiante' : difficulty === 'discipulo' ? 'Intermedio' : 'Avanzado'}</span>
                    </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow min-w-0 flex flex-col items-center justify-center text-center space-y-4 p-4 sm:p-6">
              <p className="text-sm text-slate-300">{('Desafío')} {displayIndex + 1} / {totalChallenges}{isPracticeMode ? ((' · Sin tiempo')) : ''}</p>
              {challenge.reference && !feedback && <p className="text-sm text-amber-300">{gameMode==='complete-phrase'||gameMode==='guess-the-phrase'?'Ejercicio sobre un fragmento':'Referencia'}: {challenge.reference} · {bibleVersion.toUpperCase()}</p>}
              {challenge.guidance && <p className="rounded-xl border border-amber-400/40 p-3 text-sm text-amber-200">Para leer acompañados: {challenge.guidance}</p>}
              {challenge.contextNote && <details className="text-left text-sm text-slate-300"><summary className="cursor-pointer py-2 text-amber-200">Comprender el contexto</summary><p>{challenge.contextNote}</p></details>}
              {feedback && (
                  <div className={`w-full max-w-md animate-fade-in flex flex-col items-center justify-center space-y-4 p-6 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl shadow-2xl ${feedback === 'correct' ? 'text-green-400 border-green-500/20' : 'text-red-400 border-red-500/20'}`}>
                    {gameMode === 'counseling-practical' ? <BookOpen className="w-16 h-16 mx-auto text-sky-300"/> : feedback === 'correct' ? 
                        <CheckCircle className="w-16 h-16 mx-auto text-green-400"/> : <XCircle className="w-16 h-16 mx-auto text-red-400"/>
                    }
                    <div className="text-center space-y-1">
                      <p className="text-2xl font-extrabold tracking-wide uppercase">
                        {gameMode === 'counseling-practical' ? 'Para reflexionar' : feedback === 'correct' ? t.game.correct : timeLeft === 0 && !isPracticeMode ? (('Tiempo terminado')) : t.game.incorrect}
                      </p>
                      {feedback === 'incorrect' && (
                        <p className="text-xs text-slate-400 font-medium">
                          {('La respuesta correcta es:')}
                        </p>
                      )}
                    </div>

                    <div className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 text-center my-1 shadow-inner space-y-3">
                      {gameMode === 'counseling-practical' && <p className="font-bold text-sm text-sky-300">{('Reflexión orientativa · Lee el pasaje en su contexto')}</p>}
                      <p className="text-lg font-medium text-slate-100 italic leading-relaxed">
                        {gameMode === 'counseling-practical' ? challenge.devotionalExcerpt : gameMode === 'complete-phrase' ? fullAnswer : (challenge.phrase || challenge.answer || (challenge.type === 'classification' ? challenge.theme : challenge.type === 'word-search' ? challenge.words.join(', ') : challenge.options?.[challenge.correctIndex]) || '')}
                      </p>
                      {(challenge.reference || challenge.biblicalSupport) && (
                        <p className="text-xs text-amber-400 font-bold flex items-center justify-center gap-1.5 pt-1 border-t border-slate-800/40">
                          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                          {challenge.reference || challenge.biblicalSupport}
                        </p>
                      )}
                    </div>

                    {(challenge.reference || challenge.biblicalSupport) && (
                      <span className="text-[10px] text-slate-500 italic font-medium">
                        {('¡Te animamos a leer el capítulo completo en tu Biblia para profundizar en su contexto!')}
                      </span>
                    )}

                    <Button onClick={handleNextTurn} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-5 rounded-xl mt-2 transition-all duration-200">
                      {t.game.continue}
                    </Button>
                  </div>
              )}
              {!feedback && <fieldset className="w-full min-w-0" disabled={!isPracticeMode && !readyToAnswer && gameMode !== 'bible-rosco' && gameMode !== 'guess-the-phrase'}> {
                gameMode === 'guess-the-phrase' ? renderGuessThePhrase() :
                gameMode === 'bible-rosco' ? renderBibleRosco() :
                gameMode === 'word-search' ? (challenge.type === 'classification' ? renderClassificationGame() : renderWordSearchGame()) :
                gameMode === 'counseling-practical' ? renderCounselingGame() :
                renderDefaultGame()
              }</fieldset>}
            </CardContent>
          </Card>
        </main>
        
        {/* Side Panel / Score */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-3">
          {!isPracticeMode && <Card className="bg-slate-900/80 backdrop-blur-md border-primary/30 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="p-4 bg-slate-950/80 border-b border-slate-800">
              <CardTitle className="font-headline text-lg flex items-center gap-2 text-amber-300">
                <Trophy className="w-5 h-5 text-amber-400"/>
                {t.game.score_title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              {teams.map((team, index) => {
                const isSky = index === 1;
                const isActive = index === currentTeamIndex;
                const textColor = isSky ? 'text-sky-300' : 'text-amber-300';
                const scoreColor = isSky ? 'text-sky-200' : 'text-amber-400';
                const progressBg = isSky ? '[&>div]:bg-sky-500' : '[&>div]:bg-amber-500';
                return (
                  <div key={index} className={`space-y-1.5 p-3.5 rounded-2xl border transition-all duration-300 ${
                    isSky 
                      ? isActive 
                        ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.4)] scale-102 font-black' 
                        : 'bg-slate-950/40 border-slate-900 opacity-55' 
                      : isActive 
                        ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-102 font-black' 
                        : 'bg-slate-950/40 border-slate-900 opacity-55'
                  }`}>
                    <div className="flex justify-between text-xs">
                      <span className={textColor}>{team.name}</span>
                      <span className={scoreColor}>{team.score} pts</span>
                    </div>
                    <Progress value={(team.score / (totalChallenges * 10 / (teams.length || 1))) * 100} className={`h-2 ${progressBg}`} />
                  </div>
                );
              })}
            </CardContent>
          </Card>}
          
           <Alert className="p-4 bg-slate-900/80 border-primary/30 rounded-3xl">
                <AlertTitle className="font-bold text-sm text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {t.game.progress}
                </AlertTitle>
                <AlertDescription className="text-xs text-slate-400 mt-1">
                  {t.game.challenge_of.replace('{current}', (displayIndex + 1).toString()).replace('{total}', totalChallenges.toString())}
                </AlertDescription>
              <Progress value={progress} className="mt-2 h-1.5" />
           </Alert>
            
          <Clarification prompt={gameMode === 'bible-rosco' ? (challenges[currentTeamIndex]?.letters?.[teamActiveRoscoIndex[currentTeamIndex] || 0]?.definition || 'Consulta del círculo') : (challenge.hint || challenge.question || challenge.description || challenge.theme || 'Consulta del desafío')} answer={answer} reference={gameMode === 'bible-rosco' ? (challenges[currentTeamIndex]?.letters?.[teamActiveRoscoIndex[currentTeamIndex] || 0]?.reference || '') : (challenge.reference || challenge.biblicalSupport || challenge.references?.join('; ') || '')} version={bibleVersion} />
        </aside>
      </div>
    </div>
  );
}


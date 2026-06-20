"use client";

import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { GameHeader } from '@/components/game/GameHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Trophy, CheckCircle, XCircle, Clock, Star, Brain, Users, Heart, BookOpen, Send, Sparkles, Delete, RotateCcw } from 'lucide-react';
import { AdBanner } from '@/components/game/AdBanner';
import { normalizeForValidation } from '@/lib/string-utils';
import { getNewChallenges } from '@/data/newChallengesData';

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
    if (type === 'syllables' && challenge.syllables) {
        return shuffleArray(challenge.syllables).join(' - ');
    }
    const chars = challenge.answer.toUpperCase().split('');
    return shuffleArray(chars).join(' ');
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
    let missingIndices: number[] = [];

    if (difficulty === 'principiante') {
        missingIndices = [len - 1]; 
    } else if (difficulty === 'discipulo') {
        const count = Math.max(1, Math.floor(len * 0.3));
        for (let i = 0; i < count; i++) {
            const index = Math.floor(Math.random() * len);
            if (!missingIndices.includes(index)) missingIndices.push(index);
        }
    } else {
        const count = Math.max(2, Math.floor(len * 0.5));
        for (let i = 0; i < count; i++) {
            const index = Math.floor(Math.random() * len);
            if (!missingIndices.includes(index)) missingIndices.push(index);
        }
    }

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

function generateWordSearchGrid(words: string[], size: number = 10): string[][] {
  const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
  const directions = [
    { r: 0, c: 1 },
    { r: 1, c: 0 },
    { r: 1, c: 1 },
  ];

  for (const word of words) {
    const cleanWord = word.toUpperCase().replace(/[^A-Z]/g, '');
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 100) {
      attempts++;
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * (size - (dir.r * cleanWord.length)));
      const col = Math.floor(Math.random() * (size - (dir.c * cleanWord.length)));
      
      let fits = true;
      for (let i = 0; i < cleanWord.length; i++) {
        const r = row + dir.r * i;
        const c = col + dir.c * i;
        if (grid[r] && grid[r][c] !== undefined && grid[r][c] !== '' && grid[r][c] !== cleanWord[i]) {
          fits = false;
          break;
        }
      }
      if (fits) {
        for (let i = 0; i < cleanWord.length; i++) {
          const r = row + dir.r * i;
          const c = col + dir.c * i;
          if (grid[r]) grid[r][c] = cleanWord[i];
        }
        placed = true;
      }
    }
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }
  return grid;
}

export default function GamePage() {
  const router = useRouter();
  const { 
    teams, gameMode, isPracticeMode, playSound, 
    updateScore, resetGame, restartCurrentGame, roundTime, updateLives, 
    gameRestarted, difficulty, language, isPremium, t, bibleData, activeLesson 
  } = useGame();
  
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(roundTime);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // Hint reveal system
  const [hintRevealed, setHintRevealed] = useState(false);
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  // States for new challenge modes
  const [teamActiveRoscoIndex, setTeamActiveRoscoIndex] = useState<Record<number, number>>({});
  const [teamRoscoAnswers, setTeamRoscoAnswers] = useState<Record<number, Record<number, 'correct' | 'incorrect' | 'skipped'>>>({});
  const [teamTimeLeft, setTeamTimeLeft] = useState<Record<number, number>>({});
  const [isTurnPaused, setIsTurnPaused] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const [lastIncorrectWord, setLastIncorrectWord] = useState<{ word: string; letter: string; teamName: string } | null>(null);
  
  // States for Word Search
  const [wsGrid, setWsGrid] = useState<string[][]>([]);
  const [wsSelected, setWsSelected] = useState<{r: number, c: number}[]>([]);
  const [wsFound, setWsFound] = useState<string[]>([]);
  
  // States for Classification
  const [classItemIndex, setClassItemIndex] = useState(0);

  // For "Guess the Phrase"
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [letterInput, setLetterInput] = useState('');
  const [isCancelled, setIsCancelled] = useState(false);
  const [playedChallenges, setPlayedChallenges] = useState<any[]>([]);

  // Auto-saved reflection so students never lose their input
  const [studentReflection, setStudentReflection] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('divina_palabra_temp_reflection') || '';
    }
    return '';
  });

  useEffect(() => {
    localStorage.setItem('divina_palabra_temp_reflection', studentReflection);
  }, [studentReflection]);

  const challenges = useMemo(() => {
    if (!gameMode) return [];

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

    // Handle new modes first
    if (gameMode === 'bible-rosco') {
      const catalog = getNewChallenges(language);
      const roscoLists = catalog.rosco[difficulty] || catalog.rosco['principiante'];
      return roscoLists.map(letters => ({ type: 'rosco', letters }));
    }

    if (gameMode === 'word-search') {
      const catalog = getNewChallenges(language);
      const wsSets = catalog.wordSearch[difficulty] || catalog.wordSearch['principiante'];
      const classSets = catalog.classification;
      const combined: any[] = [];
      const len = Math.max(wsSets.length, classSets.length);
      for (let i = 0; i < len; i++) {
        if (wsSets[i]) combined.push({ type: 'word-search', ...wsSets[i] });
        if (classSets[i]) combined.push({ type: 'classification', ...classSets[i] });
      }
      return combined;
    }

    if (gameMode === 'counseling-practical') {
      const catalog = getNewChallenges(language);
      return catalog.counseling;
    }

    // Otherwise, generate challenges from local JSON catalog
    if (gameMode === 'find-word') {
        const shuffledLevel1 = shuffleArray(bibleData.findWordLevel1);
        const shuffledLevel2 = shuffleArray(bibleData.findWordLevel2);
        
        switch (difficulty) {
            case 'principiante':
                return shuffledLevel1.map(challenge => ({
                    ...challenge,
                    question: scrambleWord(challenge, 'syllables'),
                    level: 1, 
                    hint: challenge.hint,
                }));
            case 'discipulo':
                const C_SYLLABLES = Math.min(15, shuffledLevel1.length);
                const C_LETTERS = Math.min(15, shuffledLevel2.length);
                const syllablesPart = shuffledLevel1.slice(0, C_SYLLABLES).map(challenge => ({
                    ...challenge,
                    question: scrambleWord(challenge, 'syllables'),
                    level: 1,
                    hint: language === 'es' ? 'Ordena las sílabas para revelar la palabra.' : 'Order the syllables to reveal the word.',
                }));
                const lettersPart = shuffledLevel2.slice(0, C_LETTERS).map(challenge => ({
                    ...challenge,
                    question: scrambleWord(challenge, 'letters'),
                    level: 2,
                    hint: language === 'es' ? 'Ordena las letras para revelar la palabra.' : 'Order the letters to reveal the word.',
                }));
                return shuffleArray([...syllablesPart, ...lettersPart]);
            case 'avanzado':
                return [...shuffledLevel1, ...shuffledLevel2].map(challenge => ({
                    ...challenge,
                    question: scrambleWord(challenge, 'letters'),
                    level: 2,
                    hint: language === 'es' ? 'Modo avanzado: revela la palabra sin pistas descriptivas.' : 'Advanced mode: reveal the word without descriptive hints.',
                }));
            default:
                 return [];
        }
    }
    
    if (gameMode === 'complete-phrase') {
        return shuffleArray(bibleData.completePhraseChallenges).map(c => generateCompletePhraseChallenge(c, difficulty));
    }
    
    if (gameMode === 'guess-the-phrase') {
      return shuffleArray(bibleData.guessPhraseChallenges).map(c => generateGuessPhraseChallenge(c, difficulty));
    }

    return [];
  }, [gameMode, difficulty, bibleData, activeLesson, language]);

  useEffect(() => {
    const challenge = challenges[currentChallengeIndex];
    if (gameMode === 'guess-the-phrase' && challenge?.preGuessed) {
      setGuessedLetters(challenge.preGuessed);
    } else {
      setGuessedLetters([]);
    }
  }, [currentChallengeIndex, challenges, gameMode]);

  useEffect(() => {
    const challenge = challenges[currentChallengeIndex];
    if (challenge && challenge.type === 'word-search') {
      const size = difficulty === 'principiante' ? 8 : (difficulty === 'discipulo' ? 10 : 12);
      const grid = generateWordSearchGrid(challenge.words, size);
      setWsGrid(grid);
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
  }, [currentChallengeIndex, challenges, difficulty, gameMode]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(roundTime);
    
    if (isPracticeMode || gameOver || gameMode === 'guess-the-phrase' || !!feedback) {
        return;
    }
    
    if (gameMode === 'bible-rosco' && isTurnPaused) {
        return;
    }
    
    timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
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
    if (timeLeft === 0 && !isPracticeMode && !gameOver && gameMode !== 'guess-the-phrase' && !feedback) {
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
  }, [timeLeft, isPracticeMode, gameOver, gameMode, feedback, teamTimeLeft, currentTeamIndex, teams, roundTime, challenges, currentChallengeIndex, teamRoscoAnswers, teamActiveRoscoIndex]);

  // Handle timer resumes in bible-rosco when unpaused
  useEffect(() => {
    if (gameMode === 'bible-rosco') {
      if (isTurnPaused) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else if (!gameOver && !feedback && !isPracticeMode) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
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
    setHintRevealed(false);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    if (difficulty === 'principiante' && !feedback) {
      hintTimerRef.current = setTimeout(() => setHintRevealed(true), 5000);
    }
    return () => { if (hintTimerRef.current) clearTimeout(hintTimerRef.current); };
  }, [currentChallengeIndex, difficulty, feedback]);

  useEffect(() => {
    if (!gameMode) {
      router.push('/');
      return;
    }
  
    if (!feedback) {
      startTimer();
    }
  
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameMode, router, currentChallengeIndex, feedback]);

  useEffect(() => {
    if (gameRestarted > 0) {
        setCurrentChallengeIndex(0);
        setCurrentTeamIndex(0);
        setAnswer('');
        setFeedback(null);
        setHintRevealed(false);
        setGuessedLetters([]);
        setLetterInput('');
        setStudentReflection('');
        localStorage.removeItem('divina_palabra_temp_reflection');
        setIsCancelled(false);
        setPlayedChallenges([]);
        setTeamActiveRoscoIndex({});
        setTeamRoscoAnswers({});
        setTeamTimeLeft({});
        setIsTurnPaused(true);
        setShowComparison(false);
        setLastIncorrectWord(null);
        setWsGrid([]);
        setWsSelected([]);
        setWsFound([]);
        setClassItemIndex(0);
      }
    }, [gameRestarted]);

  const challenge = challenges[currentChallengeIndex];
  const currentTeam = teams[currentTeamIndex];

  useEffect(() => {
    if (challenge) {
      setPlayedChallenges(prev => {
        const exists = prev.some(c => 
          (c.id && c.id === challenge.id) || 
          (c.reference && c.reference === challenge.reference) ||
          (c.phrase && c.phrase === challenge.phrase)
        );
        if (exists) return prev;
        return [...prev, challenge];
      });
    }
  }, [challenge]);

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
    let pool: string[] = [];
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

    // Fallback if not enough dynamic distractors
    if (pool.length < 10) {
      if (len === 1) {
        pool = [
          "DIOS", "SEÑOR", "JESÚS", "FE", "AMOR", "VIDA", "GRACIA", "ESPÍRITU", 
          "PAZ", "VERDAD", "LUZ", "ESPERANZA", "JUSTICIA", "SALVACIÓN", 
          "MISERICORDIA", "ALMA", "GLORIA", "BENDICIÓN", "FIDELIDAD", "CRISTO"
        ];
      } else if (len === 2) {
        pool = [
          "DIOS TODOPODEROSO", "EL SEÑOR", "JESUCRISTO NUESTRO", "FE Y ESPERANZA", 
          "GRACIA Y PAZ", "AMOR DE DIOS", "ESPÍRITU SANTO", "VIDA ETERNA", 
          "CAMINO Y VERDAD", "LUZ DEL MUNDO", "PADRE CELESTIAL", "PALABRA DE DIOS"
        ];
      } else {
        const staticPool = [
          "NADA ME FALTARA", "CREO DIOS LOS CIELOS", "YO SOY EL ALFA", 
          "LA VERDAD OS HARA LIBRES", "TODO LO PUEDO EN CRISTO", "EL AMOR ES PACIENTE", 
          "SOLO DE PAN VIVIRA EL HOMBRE", "MAS BUSCAD PRIMERAMENTE", "YO Y EL PADRE"
        ];
        pool = staticPool.filter(p => p.split(' ').length === len);
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

    // Fallback if set is still small
    const fallbackList = ["DIOS", "SEÑOR", "JESÚS", "FE", "AMOR", "VIDA", "GRACIA", "ESPÍRITU"];
    let fallbackAttempts = 0;
    while (optionsSet.size < 4 && fallbackAttempts < 20) {
      fallbackAttempts++;
      const shuffledFallbacks = shuffleArray(fallbackList);
      const subPhrase = shuffledFallbacks.slice(0, len).join(' ').toUpperCase();
      optionsSet.add(subPhrase);
    }

    return shuffleArray(Array.from(optionsSet));
  }, [challenge, gameMode, bibleData]);

  if (!gameMode || challenges.length === 0) {
    return null;
  }

  const handleNextTurn = () => {
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
      if(timerRef.current) clearInterval(timerRef.current);
      
      if (isCorrect) {
          playSound('correct');
          setFeedback('correct');
          if(!isPracticeMode) updateScore(currentTeamIndex, 10);
      } else {
          playSound('incorrect');
          setFeedback('incorrect');
          if(!isPracticeMode) {
              const livesLeft = updateLives(currentTeamIndex, -1);
              if (livesLeft <= 0 && !activeLesson) {
                  setGameOver(true);
              }
          }
      }
  };

  const submitAnswer = () => {
      let isCorrect = false;
      if (gameMode === 'find-word') {
          isCorrect = normalizeForValidation(answer) === normalizeForValidation(challenge.answer || '');
      } else if (gameMode === 'complete-phrase') {
          isCorrect = normalizeForValidation(answer) === normalizeForValidation(challenge.fullPhrase || '');
      }
      handleAnswer(isCorrect);
  };

  // Bible Rosco logic helpers
  const startPlayingTurn = () => {
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
    if (isTurnPaused || gameOver || feedback) return;

    const roscoLetters = challenges[currentTeamIndex]?.letters || challenges[0]?.letters || [];
    const activeIndex = teamActiveRoscoIndex[currentTeamIndex] || 0;
    const activeLetterChallenge = roscoLetters[activeIndex];
    if (!activeLetterChallenge) return;

    const isCorrect = normalizeForValidation(answer) === normalizeForValidation(activeLetterChallenge.word);
    
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
        if (livesLeft <= 0 && !activeLesson) {
          // Keep competitive flow going
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
    if (isTurnPaused || gameOver || feedback) return;

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

    setIsTurnPaused(true);
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
    alert((language === 'es' ? 'La palabra comienza con: ' : 'The word starts with: ') + syllable);
  };

  const helpRoscoLength = () => {
    const roscoLetters = challenges[currentTeamIndex]?.letters || challenges[0]?.letters || [];
    const activeIndex = teamActiveRoscoIndex[currentTeamIndex] || 0;
    const activeLetterChallenge = roscoLetters[activeIndex];
    if (!activeLetterChallenge) return;
    
    playSound('click');
    alert((language === 'es' ? 'Longitud de la palabra: ' : 'Word length: ') + activeLetterChallenge.word.length + (language === 'es' ? ' letras' : ' letters'));
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
    alert((language === 'es' ? 'Letras descartadas (no forman parte de la palabra): ' : 'Discarded letters (not in the word): ') + discarded);
  };

  // Word Search / Sopa de Letras logic helpers
  const handleCellClick = (r: number, c: number) => {
    if (feedback) return;
    playSound('click');
    
    const idx = wsSelected.findIndex(cell => cell.r === r && cell.c === c);
    if (idx >= 0) {
      setWsSelected(prev => prev.filter((_, i) => i !== idx));
    } else {
      setWsSelected(prev => [...prev, { r, c }]);
    }
  };

  const verifySelectedWord = () => {
    const selectedWord = wsSelected.map(cell => wsGrid[cell.r][cell.c]).join('');
    const reversedWord = [...selectedWord].reverse().join('');
    
    const foundWord = challenge.words.find((w: string) => {
      const normalizedW = normalizeForValidation(w).toUpperCase();
      return normalizedW === selectedWord || normalizedW === reversedWord;
    });

    if (foundWord && !wsFound.includes(foundWord)) {
      playSound('correct');
      const updatedFound = [...wsFound, foundWord];
      setWsFound(updatedFound);
      setWsSelected([]);
      if (!isPracticeMode) updateScore(currentTeamIndex, 15);
      
      if (updatedFound.length >= challenge.words.length) {
        handleAnswer(true);
      }
    } else {
      playSound('incorrect');
      if (!isPracticeMode) {
        const livesLeft = updateLives(currentTeamIndex, -1);
        if (livesLeft <= 0) {
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
      alert((language === 'es' ? 'La primera letra de una de las palabras es: ' : 'The first letter of one of the words is: ') + word[0]);
    }
  };

  const helpWsDirection = () => {
    playSound('click');
    alert(language === 'es' 
      ? 'Las palabras están escritas de izquierda a derecha (horizontal) o de arriba abajo (vertical).' 
      : 'Words are written from left to right (horizontal) or top to bottom (vertical).'
    );
  };

  const helpWsLength = () => {
    playSound('click');
    const remaining = challenge.words.filter((w: string) => !wsFound.includes(w));
    const lengths = remaining.map((w: string) => w.length).join(', ');
    alert((language === 'es' ? 'Longitudes de palabras restantes: ' : 'Remaining word lengths: ') + lengths);
  };

  // Classification logic helper
  const handleClassifySelect = (cat: string) => {
    playSound('click');
    const items = challenge.items || [];
    const currentItem = items[classItemIndex];
    if (!currentItem) return;

    const isCorrect = cat === currentItem.category;
    
    if (isCorrect) {
      playSound('correct');
      if (!isPracticeMode) updateScore(currentTeamIndex, 5);
      
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
        if (livesLeft <= 0) {
          setGameOver(true);
        }
      }
      alert(language === 'es' ? 'Categoría incorrecta. ¡Intenta de nuevo!' : 'Incorrect category. Try again!');
    }
  };

  // Counseling logic helper
  const handleCounselingSelect = (idx: number) => {
    playSound('click');
    const isCorrect = idx === challenge.correctIndex;
    
    challenge.phrase = challenge.devotionalExcerpt;
    challenge.reference = challenge.biblicalSupport;
    
    handleAnswer(isCorrect);
  };

  const handleSelectOption = (opt: string) => {
    if (feedback) return;
    playSound('click');
    const missingIndices = (challenge as any).missingIndices || [];
    const words = (challenge as any).words || [];
    const sortedIndices = [...missingIndices].sort((a, b) => a - b);
    const correctOption = sortedIndices.map((idx: number) => words[idx]).join(' ');

    const isCorrect = normalizeForValidation(opt) === normalizeForValidation(correctOption);
    setAnswer(isCorrect ? challenge.fullPhrase : opt); 
    handleAnswer(isCorrect);
  };

  const handleGuessLetter = (inputLetter?: string) => {
    const targetLetter = inputLetter || letterInput;
    const letter = normalizeForValidation(targetLetter.toLowerCase());
    if (!letter || guessedLetters.includes(letter)) return;

    playSound('click');
    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);
    setLetterInput('');

    const phrase = challenge.phrase || '';
    const cleanLetter = normalizeForValidation(letter);
    const inPhrase = normalizeForValidation(phrase).includes(cleanLetter);

    if (!inPhrase) {
        playSound('incorrect');
        if(!isPracticeMode) {
            const livesLeft = updateLives(currentTeamIndex, -1);
            if (livesLeft <= 0 && !activeLesson) {
                setGameOver(true);
            }
        }
    } else {
        playSound('correct');
        const phraseLetters = [...new Set(normalizeForValidation(phrase).replace(/ /g, ''))];
        const revealedLetters = phraseLetters.filter(l => newGuessed.includes(l));
        if (revealedLetters.length === phraseLetters.length) {
            setFeedback('correct');
            if(!isPracticeMode) updateScore(currentTeamIndex, 20);
        }
    }
    if (teams.length > 1) {
      setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
    }
  };

  const handleGuessPhrase = () => {
      const isCorrect = normalizeForValidation(answer) === normalizeForValidation(challenge.phrase || '');
      handleAnswer(isCorrect);
  };

  const handleSendHomework = () => {
    playSound('correct');
    const score = teams[0]?.score || 0;
    const lessonName = activeLesson?.lessonName || 'Lección';
    const message = t.classroom.whatsapp_message_template
      .replace('{lesson}', lessonName)
      .replace('{score}', score.toString())
      .replace('{reflection}', studentReflection);

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setStudentReflection('');
    localStorage.removeItem('divina_palabra_temp_reflection');
  };
  
  const winner = teams.length > 0 
    ? teams.reduce((prev, current) => (prev.score > current.score) ? prev : current)
    : null;

  if (gameOver) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 relative overflow-hidden">
            {/* Glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

            <GameHeader />
            <Card className="w-full max-w-xl text-center bg-slate-900/80 backdrop-blur-md border-primary/30 shadow-2xl rounded-3xl overflow-hidden mt-8 z-10">
                <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />
                <CardHeader>
                    <CardTitle className="font-headline text-4xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-yellow-500 flex items-center justify-center gap-2">
                      <Trophy className="w-8 h-8 text-amber-400 fill-current" />
                      {isCancelled ? t.summary.title_cancelled : t.summary.title_completed}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                    {activeLesson ? (
                      // Virtual Classroom Homework submission screen
                      <div className="space-y-4 text-left bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                          <h3 className="text-xl font-bold text-amber-300">{activeLesson.lessonName}</h3>
                          <p className="text-sm bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 font-semibold">
                            {t.game.final_score} {teams[0]?.score || 0} pts
                          </p>
                        </div>

                        <div className="space-y-2 mt-2">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-sky-400" />
                            {t.classroom.student_reflection_title}
                          </h4>
                          <p className="text-slate-200 font-medium italic pl-3 border-l-2 border-amber-500">
                            "{activeLesson.reflectionQuestion}"
                          </p>
                          
                          <label className="block text-xs font-semibold text-slate-400 mt-4">
                            {t.classroom.student_reflection_label}
                          </label>
                          <textarea
                            value={studentReflection}
                            onChange={(e) => setStudentReflection(e.target.value)}
                            placeholder={t.classroom.student_reflection_placeholder}
                            className="w-full h-32 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 placeholder-slate-600"
                          />
                        </div>

                        <Button 
                          onClick={handleSendHomework} 
                          disabled={!studentReflection.trim()}
                          className="w-full font-bold text-slate-950 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 py-6 rounded-xl flex items-center justify-center gap-2 mt-4"
                        >
                          <Send className="w-5 h-5 fill-current" />
                          {t.classroom.send_homework}
                        </Button>
                      </div>
                    ) : (
                      // Standard participation summary screen
                      <div className="space-y-6">
                        {teams.length > 1 && winner ? (
                          <>
                            <h3 className="text-2xl font-bold text-amber-300">{t.game.winner} {winner.name}</h3>
                            <div className="space-y-2 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                                {teams.sort((a,b) => b.score - a.score).map(team => (
                                    <p key={team.name} className="text-lg flex justify-between font-semibold">
                                      <span className="text-slate-400">{team.name}</span>
                                      <span className="text-amber-400">{team.score} {t.game.points}</span>
                                    </p>
                                ))}
                            </div>
                          </>
                        ) : (
                          <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800">
                            {teams.length > 0 && (
                              <p className="text-2xl text-amber-400 font-bold">
                                {t.summary.points_obtained}: {teams[0].score} pts
                              </p>
                            )}
                            <p className="text-slate-400 text-sm mt-1">
                              {t.summary.challenges_solved}: {isCancelled ? Math.max(0, playedChallenges.length - 1) : playedChallenges.length}
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
                                const fullText = pc.fullPhrase || pc.phrase || pc.question || pc.word;
                                return (
                                  <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 hover:border-amber-500/30 transition-all duration-200">
                                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm mb-1.5">
                                      <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                                      <span>{pc.reference || (language === 'es' ? 'Desafío ' + (idx + 1) : 'Challenge ' + (idx + 1))}</span>
                                    </div>
                                    <p className="text-slate-300 text-xs italic pl-2.5 border-l-2 border-slate-700">
                                      "{fullText}"
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button onClick={restartCurrentGame} size="lg" className="flex-grow font-bold bg-amber-500 text-slate-950 hover:bg-amber-600 rounded-xl py-6">
                        {t.game.play_again}
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

  const totalChallenges = challenges.length;
  const progress = (currentChallengeIndex / totalChallenges) * 100;
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
                    onClick={startPlayingTurn}
                    className={`font-bold text-slate-950 rounded-full py-1.5 px-4 shadow-lg animate-pulse text-xs ${
                      isSky ? 'bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600' : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600'
                    }`}
                  >
                    Comenzar
                  </Button>
                  <p className="text-[9px] text-slate-500">{timeLeftForTeam}s disponible</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  <p className={`text-[10px] md:text-xs font-black uppercase tracking-wide truncate max-w-[140px] ${teamColorText}`}>{teamName}</p>
                  <p className={`text-3xl md:text-4xl font-headline font-black tracking-tight leading-none ${teamColorText}`}>
                    {timeLeft}s
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
            {language === 'es' ? 'Comparación de Equipos' : 'Teams Comparison'}
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
                {language === 'es' ? 'Respuesta Incorrecta' : 'Incorrect Answer'}
              </p>
              <p className="text-sm text-slate-300">
                {language === 'es' 
                  ? `La respuesta correcta de ${lastIncorrectWord.teamName} para la letra "${lastIncorrectWord.letter}" era:` 
                  : `${lastIncorrectWord.teamName}'s correct answer for letter "${lastIncorrectWord.letter}" was:`}
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
              {language === 'es' ? 'Continuar al Siguiente Turno' : 'Continue to Next Turn'}
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
              {language === 'es' ? 'Turno de:' : 'Turn of:'} {teams[currentTeamIndex]?.name}
            </p>
            <p className="text-base text-slate-300">
              {language === 'es' 
                ? 'Presiona Comenzar para ver la pista y reactivar el tiempo.' 
                : 'Press Start to reveal clue and resume time.'}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 max-w-xl mx-auto space-y-4 text-left">
              <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-wider">
                <span>{activeLetterChallenge.type === 'starts' ? (language === 'es' ? 'Empieza con' : 'Starts with') : (language === 'es' ? 'Contiene' : 'Contains')} "{activeLetterChallenge.letter}"</span>
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
                placeholder={t.game.input_placeholder}
                className="text-center text-lg h-14 border-slate-800 bg-slate-950 focus:border-amber-500/50 text-slate-200"
              />

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={submitRoscoAnswer} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold h-12 rounded-xl text-sm">
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

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center max-w-3xl mx-auto">
          <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-3xl shadow-inner max-w-sm">
            <div 
              className="grid gap-1"
              style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
            >
              {wsGrid.map((row, rIdx) => 
                row.map((char, cIdx) => {
                  const isSelected = wsSelected.some(cell => cell.r === rIdx && cell.c === cIdx);
                  return (
                    <button
                      key={`${rIdx}-${cIdx}`}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm font-extrabold border transition-all duration-150 ${
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
              {language === 'es' ? 'Palabras a buscar:' : 'Words to find:'}
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
                {language === 'es' ? 'Selección:' : 'Selection:'} <span className="text-amber-400 font-mono font-bold text-sm tracking-widest">{wsSelected.map(cell => wsGrid[cell.r][cell.c]).join('')}</span>
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

        <div className="flex gap-2 justify-center max-w-sm mx-auto">
          {difficulty === 'principiante' && (
            <Button onClick={helpWsFirstLetter} variant="ghost" className="text-xs text-sky-400 hover:text-sky-300">
              💡 {language === 'es' ? 'Primera Letra' : 'First Letter'}
            </Button>
          )}
          {difficulty === 'discipulo' && (
            <Button onClick={helpWsDirection} variant="ghost" className="text-xs text-sky-400 hover:text-sky-300">
              💡 {language === 'es' ? 'Dirección' : 'Direction'}
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
          {language === 'es' ? 'Item' : 'Item'} {classItemIndex + 1} {language === 'es' ? 'de' : 'of'} {items.length}
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
            💡 {language === 'es' ? 'Mostrar Pista' : 'Show Hint'}
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
          <p className="text-sm md:text-base text-slate-300 leading-relaxed italic">
            "{challenge.description}"
          </p>
          <div className="border-t border-slate-800/40 pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              {language === 'es' ? 'Pregunta:' : 'Question:'}
            </h4>
            <p className="text-base font-bold text-slate-100">
              {challenge.question}
            </p>
          </div>
        </div>

        {hintRevealed && (
          <div className="bg-sky-500/5 border border-sky-500/10 p-4 rounded-xl text-xs text-sky-400 font-medium">
            💡 {(t.game.suggested_verse || 'Versículo sugerido')}: {challenge.suggestedVerse}
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
              💡 {language === 'es' ? 'Ver Versículo de Apoyo' : 'Show Support Verse'}
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderGuessThePhrase = () => {
    const phrase = (challenge.phrase || '').toUpperCase();
    const displayedPhrase = phrase.split('').map((char: string) => {
        if (char === ' ') return ' ';
        if (guessedLetters.includes(normalizeForValidation(char))) return char;
        return '_';
    }).join('');

    const category = language === 'es' ? 'Revelar Frase' : 'Reveal the Phrase';

    return (
        <div className="w-full space-y-4 animate-scroll-reveal">
            {/* Category badge */}
            <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider mb-1">
              {category}
            </div>

            {/* Hint reveal system for guess-the-phrase */}
            {!hintRevealed ? (
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs text-slate-500 italic">{language === 'es' ? 'Intenta resolver sin pista primero...' : 'Try solving without the hint first...'}</p>
                <Button onClick={() => setHintRevealed(true)} size="sm" variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs">
                  {language === 'es' ? '💡 Ver Pista' : '💡 Show Hint'}
                </Button>
              </div>
            ) : (
              <p className="text-sm text-sky-300 font-medium tracking-wide">{challenge.hint}</p>
            )}
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest font-mono text-amber-400 bg-slate-950/80 p-4 rounded-xl border border-slate-800/60 shadow-inner">
                {displayedPhrase.split(' ').map((word: string, i: number) => <span key={i} className="inline-block mr-4">{word}</span>)}
            </h2>
            
            {/* Virtual Keyboard Grid (Mobile Friendly, No native keyboard popup) */}
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5 justify-center max-w-lg mx-auto my-3 p-2 bg-slate-950/30 border border-slate-850 rounded-2xl">
              {alphabetKeys.map(letter => {
                const isGuessed = guessedLetters.includes(normalizeForValidation(letter.toLowerCase()));
                const isCorrect = isGuessed && normalizeForValidation(challenge.phrase || '').includes(normalizeForValidation(letter.toLowerCase()));
                return (
                  <Button
                    key={letter}
                    variant="outline"
                    onClick={() => handleGuessLetter(letter)}
                    disabled={isGuessed || !!feedback}
                    className={`h-9 w-9 text-xs font-bold rounded-lg border transition-all p-0 ${
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
      const category = language === 'es' ? 'Completar Versículo' : 'Complete Verse';
      return (
        <div className="w-full space-y-5 animate-scroll-reveal">
          {/* Category badge */}
          <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            {category}
          </div>

          {/* Hint reveal system for complete-phrase */}
          {!hintRevealed ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-slate-500 italic">{language === 'es' ? 'Intenta resolver sin pista primero...' : 'Try solving without the hint first...'}</p>
              <Button onClick={() => setHintRevealed(true)} size="sm" variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs">
                {language === 'es' ? '💡 Ver Pista' : '💡 Show Hint'}
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
    const category = getWordCategory(challenge.answer || '', language);
    const isAvanzado = difficulty === 'avanzado';

    return (
       <div className="w-full space-y-4 animate-scroll-reveal">
          {/* Category badge */}
          <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            {category}
          </div>

          {/* Hint reveal system */}
          {!hintRevealed && !isAvanzado ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-slate-500 italic">{language === 'es' ? 'Intenta resolver sin pista primero...' : 'Try solving without the hint first...'}</p>
              <Button onClick={() => { setHintRevealed(true); }} size="sm" variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs">
                {language === 'es' ? '💡 Ver Pista' : '💡 Show Hint'}
              </Button>
            </div>
          ) : (
            <p className="text-sm text-sky-300 font-medium tracking-wide">
              {isAvanzado ? (language === 'es' ? 'Modo avanzado: sin pistas descriptivas.' : 'Advanced mode: no descriptive hints.') : challenge.hint}
            </p>
          )}
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-widest font-headline text-amber-400 bg-slate-950/60 py-6 px-4 rounded-2xl border border-slate-800/60 shadow-inner">
              {challenge.question}
          </h2>
          
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
                <span className="sr-only">Reset</span>
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-2 pt-20 md:p-4 relative overflow-x-hidden">
      {/* Dynamic background glow depending on active team - expanded & more intense */}
      <div className={`absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none transition-all duration-1000 ${
        currentTeamIndex === 1 ? 'bg-sky-500/15' : 'bg-amber-500/15'
      }`} />
      <GameHeader onCancel={() => { setIsCancelled(true); setGameOver(true); }} />
      
      <div className="flex-grow flex flex-col lg:flex-row lg:gap-4 z-10 max-w-6xl mx-auto w-full mt-4 pb-6">
        
        {/* Main Game Panel */}
        <main className="flex-grow flex flex-col pb-4 lg:pb-0 lg:w-2/3">
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
              <div className="flex items-center justify-between text-slate-300">
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
                {currentLevel && gameMode === 'find-word' && (
                    <div className="flex items-center gap-2">
                        {currentLevel === 1 ? <Star className="w-5 h-5 text-yellow-400 fill-current"/> : <Brain className="w-5 h-5 text-purple-400 fill-current"/>}
                        <span className="font-semibold text-slate-300 text-sm">{t.game.level} {currentLevel}</span>
                    </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center text-center space-y-4 p-6">
              {feedback && (
                  <div className={`w-full max-w-md animate-fade-in flex flex-col items-center justify-center space-y-4 p-6 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl shadow-2xl ${feedback === 'correct' ? 'text-green-400 border-green-500/20' : 'text-red-400 border-red-500/20 animate-shake'}`}>
                    {feedback === 'correct' ? 
                        <CheckCircle className="w-16 h-16 mx-auto text-green-400"/> : <XCircle className="w-16 h-16 mx-auto text-red-400"/>
                    }
                    <div className="text-center space-y-1">
                      <p className="text-2xl font-extrabold tracking-wide uppercase">
                        {feedback === 'correct' ? t.game.correct : t.game.incorrect}
                      </p>
                      {feedback === 'incorrect' && (
                        <p className="text-xs text-slate-400 font-medium">
                          {language === 'es' ? 'La respuesta correcta es:' : 'The correct answer is:'}
                        </p>
                      )}
                    </div>

                    <div className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 text-center my-1 shadow-inner space-y-3">
                      <p className="text-lg font-medium text-slate-100 italic leading-relaxed">
                        "{gameMode === 'complete-phrase' ? fullAnswer : (challenge.phrase || challenge.answer || '')}"
                      </p>
                      {challenge.reference && (
                        <p className="text-xs text-amber-400 font-bold flex items-center justify-center gap-1.5 pt-1 border-t border-slate-800/40">
                          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                          {challenge.reference}
                        </p>
                      )}
                    </div>

                    {challenge.reference && (
                      <span className="text-[10px] text-slate-500 italic font-medium">
                        {language === 'es' ? '¡Te animamos a leer el capítulo completo en tu Biblia para profundizar en su contexto!' : 'We encourage you to read the full chapter in your Bible to deepen your understanding of its context!'}
                      </span>
                    )}

                    <Button onClick={handleNextTurn} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-5 rounded-xl mt-2 transition-all duration-200">
                      {t.game.continue}
                    </Button>
                  </div>
              )}
              {!feedback && (
                gameMode === 'guess-the-phrase' ? renderGuessThePhrase() :
                gameMode === 'bible-rosco' ? renderBibleRosco() :
                gameMode === 'word-search' ? (challenge.type === 'classification' ? renderClassificationGame() : renderWordSearchGame()) :
                gameMode === 'counseling-practical' ? renderCounselingGame() :
                renderDefaultGame()
              )}
            </CardContent>
          </Card>
        </main>
        
        {/* Side Panel / Score */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-3">
          <Card className="bg-slate-900/80 backdrop-blur-md border-primary/30 shadow-xl rounded-3xl overflow-hidden">
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
          </Card>
          
           <Alert className="p-4 bg-slate-900/80 border-primary/30 rounded-3xl">
                <AlertTitle className="font-bold text-sm text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {t.game.progress}
                </AlertTitle>
                <AlertDescription className="text-xs text-slate-400 mt-1">
                  {t.game.challenge_of.replace('{current}', (currentChallengeIndex + 1).toString()).replace('{total}', totalChallenges.toString())}
                </AlertDescription>
              <Progress value={progress} className="mt-2 h-1.5" />
           </Alert>
            
          {!isPremium && (
            <footer className="w-full mt-auto">
               <AdBanner className="h-12 md:h-16" />
            </footer>
          )}
        </aside>
      </div>
    </div>
  );
}

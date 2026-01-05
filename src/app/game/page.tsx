
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
import { Trophy, CheckCircle, XCircle, Clock, Star, Brain, Users, Heart } from 'lucide-react';
import { AdBanner } from '@/components/game/AdBanner';
import { normalizeForValidation } from '@/lib/string-utils';

const findWordLevel1 = [
    { answer: "GENESIS", syllables: ["GE", "NE", "SIS"], hint: "EL PRIMER LIBRO DE LA BIBLIA." },
    { answer: "EXODO", syllables: ["E", "XO", "DO"], hint: "EL LIBRO DE LA SALIDA DE EGIPTO." },
    { answer: "SALMOS", syllables: ["SAL", "MOS"], hint: "LIBRO DE CANTOS Y ORACIONES." },
    { answer: "CAIN", syllables: ["CA", "IN"], hint: "HERMANO DE ABEL." },
    { answer: "DAVID", syllables: ["DA", "VID"], hint: "REY DE ISRAEL QUE DERROTO A UN GIGANTE." },
    { answer: "MOISES", syllables: ["MOI", "SES"], hint: "LIBERO A LOS ISRAELITAS DE LA ESCLAVITUD." },
    { answer: "BELEN", syllables: ["BE", "LEN"], hint: "CIUDAD DEL NACIMIENTO DE JESUS." },
    { answer: "ARCA", syllables: ["AR", "CA"], hint: "LA EMBARCACION QUE CONSTRUYO NOE." },
    { answer: "ABRAHAM", syllables: ["A", "BRA", "HAM"], hint: "PADRE DE MUCHAS NACIONES." },
    { answer: "SALOMON", syllables: ["SA", "LO", "MON"], hint: "EL REY MAS SABIO DE ISRAEL." },
    { answer: "APOSTOL", syllables: ["A", "POS", "TOL"], hint: "UNO DE LOS DOCE SEGUIDORES DE JESUS." },
    { answer: "PROFETA", syllables: ["PRO", "FE", "TA"], hint: "UN MENSAJERO DE DIOS." },
    { answer: "ANGEL", syllables: ["AN", "GEL"], hint: "MENSAJERO CELESTIAL." },
    { answer: "GOLIAT", syllables: ["GO", "LIAT"], hint: "GIGANTE DERROTADO POR DAVID." },
    { answer: "SANSON", syllables: ["SAN", "SON"], hint: "JUEZ DE ISRAEL CON FUERZA SOBRENATURAL." },
    { answer: "DANIEL", syllables: ["DA", "NIEL"], hint: "PROFETA EN EL FOSO DE LOS LEONES." },
    { answer: "ISAIAS", syllables: ["I", "SA", "IAS"], hint: "PROFETA QUE ANUNCIO AL MESIAS." },
    { answer: "JONAS", syllables: ["JO", "NAS"], hint: "PROFETA QUE FUE TRAGADO POR UN GRAN PEZ." },
    { answer: "RUT", syllables: ["RUT"], hint: "MOABITA, ANTEPASADA DE DAVID." },
    { answer: "ESTER", syllables: ["ES", "TER"], hint: "REINA JUDIA QUE SALVO A SU PUEBLO." },
    { answer: "JOB", syllables: ["JOB"], hint: "HOMBRE JUSTO QUE SUFRIO GRANDES PRUEBAS." },
    { answer: "LEVI", syllables: ["LE", "VI"], hint: "UNO DE LOS DOCE HIJOS DE JACOB." },
    { answer: "MARIA", syllables: ["MA", "RI", "A"], hint: "MADRE DE JESUS." },
    { answer: "PEDRO", syllables: ["PE", "DRO"], hint: "APOSTOL QUE NEGO A JESUS TRES VECES." },
    { answer: "PABLO", syllables: ["PA", "BLO"], hint: "APOSTOL DE LOS GENTILES." },
    { answer: "JUAN", syllables: ["JUAN"], hint: "EL DISCIPULO AMADO." },
    { answer: "LUCAS", syllables: ["LU", "CAS"], hint: "MEDICO Y AUTOR DE UN EVANGELIO." },
    { answer: "MATEO", syllables: ["MA", "TE", "O"], hint: "RECAUDADOR DE IMPUESTOS Y APOSTOL." },
    { answer: "JUDAS", syllables: ["JU", "DAS"], hint: "EL QUE TRAICIONO A JESUS." },
    { answer: "SATANAS", syllables: ["SA", "TA", "NAS"], hint: "EL ADVERSARIO." },
];

const findWordLevel2 = [
    { answer: "NAZARET", hint: "CIUDAD DONDE CRECIO JESUS." },
    { answer: "DESIERTO", hint: "LUGAR DONDE JESUS AYUNO 40 DIAS." },
    { answer: "PARABOLA", hint: "HISTORIA CORTA CON UNA ENSENANZA MORAL." },
    { answer: "TEMPLO", hint: "LUGAR SAGRADO DE ADORACION EN JERUSALEN." },
    { answer: "APOCALIPSIS", hint: "EL ULTIMO LIBRO, LLENO DE PROFECIAS." },
    { answer: "TESTAMENTO", hint: "UNA DE LAS DOS PARTES PRINCIPALES DE LA BIBLIA." },
    { answer: "JERUSALEN", hint: "LA CIUDAD SANTA." },
    { answer: "MESIAS", hint: "EL TITULO DEL 'UNGIDO'." },
    { answer: "SINAGOGA", hint: "LUGAR DE REUNION Y ORACION JUDIA." },
    { answer: "EUFRATES", hint: "UNO DE LOS RIOS DEL EDEN." },
    { answer: "MANA", hint: "EL PAN ENVIADO DEL CIELO." },
    { answer: "PENTATEUCO", hint: "LOS PRIMEROS CINCO LIBROS DE LA BIBLIA." },
    { answer: "TABERNACULO", hint: "SANTUARIO PORTATIL DE LOS ISRAELITAS." },
    { answer: "ZARZA", hint: "DONDE DIOS HABLO A MOISES." },
    { answer: "BALSAMO", hint: "RESINA AROMATICA DE GALAAD." },
    { answer: "BETESDA", hint: "ESTANQUE EN JERUSALEN DE 5 PORTICOS." },
    { answer: "CALVARIO", hint: "LUGAR DE LA CRUCIFIXION, GOLGOTA." },
    { answer: "CENA", hint: "LA ULTIMA COMIDA DE JESUS CON SUS DISCIPULOS." },
    { answer: "DISCIPULO", hint: "SEGUIDOR Y APRENDIZ DE JESUS." },
    { answer: "EVANGELIO", hint: "LAS BUENAS NUEVAS DE SALVACION." },
    { answer: "FILISTEOS", hint: "PUEBLO ENEMIGO DE ISRAEL EN LA COSTA." },
    { answer: "GALILEA", hint: "REGION NORTE DE ISRAEL DONDE JESUS MINISTRO." },
    { answer: "HEBREOS", hint: "PUEBLO ELEGIDO DE DIOS, ISRAELITAS." },
    { answer: "INCIENSO", hint: "SUSTANCIA AROMATICA QUEMADA EN EL TEMPLO." },
    { answer: "JERICO", hint: "CIUDAD CUYOS MUROS CAYERON." },
    { answer: "LEPROSO", hint: "ENFERMO DE LA PIEL SANADO POR JESUS." },
    { answer: "MILAGRO", hint: "HECHO SOBRENATURAL REALIZADO POR DIOS." },
    { answer: "NEFILIM", hint: "GIGANTES MENCIONADOS EN GENESIS." },
    { answer: "OFRENDA", hint: "REGALO DADO A DIOS COMO ACTO DE ADORACION." },
    { answer: "QUERUBIN", hint: "TIPO DE ANGEL QUE GUARDA EL EDEN." },
];

const completePhraseChallenges = [
    { fullPhrase: "EN EL PRINCIPIO CREO DIOS LOS CIELOS Y LA TIERRA", hint: "GÉNESIS 1:1" },
    { fullPhrase: "EL SENOR ES MI PASTOR NADA ME FALTARA", hint: "SALMO 23:1" },
    { fullPhrase: "NO SOLO DE PAN VIVIRA EL HOMBRE", hint: "MATEO 4:4" },
    { fullPhrase: "PEDID Y SE OS DARA", hint: "MATEO 7:7" },
    { fullPhrase: "YO Y EL PADRE UNO SOMOS", hint: "JUAN 10:30" },
    { fullPhrase: "PORQUE DE TAL MANERA AMO DIOS AL MUNDO QUE HA DADO A SU HIJO UNIGENITO", hint: "JUAN 3:16" },
    { fullPhrase: "YO SOY EL CAMINO Y LA VERDAD Y LA VIDA", hint: "JUAN 14:6" },
    { fullPhrase: "TODO LO PUEDO EN CRISTO QUE ME FORTALECE", hint: "FILIPENSES 4:13" },
    { fullPhrase: "LA FE ES LA CERTEZA DE LO QUE SE ESPERA LA CONVICCION DE LO QUE NO SE VE", hint: "HEBREOS 11:1" },
    { fullPhrase: "EL AMOR ES PACIENTE ES BONDADOSO", hint: "1 CORINTIOS 13:4" },
    { fullPhrase: "DEJAD A LOS NINOS VENIR A MI Y NO SE LO IMPIDAIS", hint: "MATEO 19:14" },
    { fullPhrase: "VENID A MI TODOS LOS QUE ESTAIS TRABAJADOS Y CARGADOS", hint: "MATEO 11:28" },
    { fullPhrase: "DE MAS ESTIMA ES EL BUEN NOMBRE QUE LAS MUCHAS RIQUEZAS", hint: "PROVERBIOS 22:1" },
    { fullPhrase: "PORQUE LA PAGA DEL PECADO ES MUERTE", hint: "ROMANOS 6:23" },
    { fullPhrase: "EN LA CASA DE MI PADRE MUCHAS MORADAS HAY", hint: "JUAN 14:2" },
    { fullPhrase: "MAS BUSCAD PRIMERAMENTE EL REINO DE DIOS Y SU JUSTICIA", hint: "MATEO 6:33" },
    { fullPhrase: "FIATE DE JEHOVA DE TODO TU CORAZON Y NO TE APOYES EN TU PROPIA PRUDENCIA", hint: "PROVERBIOS 3:5" },
    { fullPhrase: "EL PRINCIPIO DE LA SABIDURIA ES EL TEMOR DE JEHOVA", hint: "PROVERBIOS 1:7" },
    { fullPhrase: "LOS CIELOS CUENTAN LA GLORIA DE DIOS", hint: "SALMO 19:1" },
    { fullPhrase: "SI DIOS ES POR NOSOTROS QUIEN CONTRA NOSOTROS", hint: "ROMANOS 8:31" },
    { fullPhrase: "ORANDO EN TODO TIEMPO CON TODA ORACION Y SUPLICA", hint: "EFESIOS 6:18" },
    { fullPhrase: "EL GOZO DEL SENOR ES VUESTRA FORTALEZA", hint: "NEHEMÍAS 8:10" },
    { fullPhrase: "POR GRACIA SOIS SALVOS POR MEDIO DE LA FE", hint: "EFESIOS 2:8" },
    { fullPhrase: "LA HIERBA SE SECA Y LA FLOR SE MARCHITA", hint: "ISAÍAS 40:8" },
    { fullPhrase: "MI PUEBLO FUE DESTRUIDO PORQUE LE FALTO CONOCIMIENTO", hint: "OSEAS 4:6" },
    { fullPhrase: "NO OS CONFORMEIS A ESTE SIGLO", hint: "ROMANOS 12:2" },
    { fullPhrase: "SOMOS HECHURA SUYA CREADOS EN CRISTO JESUS PARA BUENAS OBRAS", hint: "EFESIOS 2:10" },
    { fullPhrase: "EL QUE NO AMA NO HA CONOCIDO A DIOS", hint: "1 JUAN 4:8" },
    { fullPhrase: "YO ESTOY A LA PUERTA Y LLAMO", hint: "APOCALIPSIS 3:20" },
    { fullPhrase: "EL QUE PERSEVERE HASTA EL FIN ESTE SERA SALVO", hint: "MATEO 24:13" },
    { fullPhrase: "NO TEMAS PORQUE YO ESTOY CONTIGO", hint: "ISAÍAS 41:10" },
    { fullPhrase: "MI YUGO ES FACIL Y LIGERA MI CARGA", hint: "MATEO 11:30" },
    { fullPhrase: "EL QUE SE HUMILLA SERA ENALTECIDO", hint: "LUCAS 14:11" },
    { fullPhrase: "SOBRE TODA COSA GUARDADA GUARDA TU CORAZON", hint: "PROVERBIOS 4:23" },
    { fullPhrase: "LA LAMPARA DEL CUERPO ES EL OJO", hint: "MATEO 6:22" },
    { fullPhrase: "NINGUNO PUEDE SERVIR A DOS SENORES", hint: "MATEO 6:24" },
    { fullPhrase: "EL QUE ESTA EN CRISTO NUEVA CRIATURA ES", hint: "2 CORINTIOS 5:17" },
    { fullPhrase: "MAS LA SENDA DE LOS JUSTOS ES COMO LA LUZ DE LA AURORA", hint: "PROVERBIOS 4:18" },
    { fullPhrase: "NO TE DEJES VENCER DE LO MALO SINO VENCE CON EL BIEN EL MAL", hint: "ROMANOS 12:21" },
    { fullPhrase: "HIJO MIO NO TE OLVIDES DE MI LEY", hint: "PROVERBIOS 3:1" },
];


const guessPhraseChallenges = [
    { phrase: "JEHOVA ES MI LUZ Y MI SALVACION", hint: "SALMO 27:1" },
    { phrase: "TODO LO PUEDO EN CRISTO QUE ME FORTALECE", hint: "FILIPENSES 4:13" },
    { phrase: "EL AMOR NUNCA DEJA DE SER", hint: "1 CORINTIOS 13:8" },
    { phrase: "YO SOY EL ALFA Y LA OMEGA", hint: "APOCALIPSIS 1:8" },
    { phrase: "LA VERDAD OS HARA LIBRES", hint: "JUAN 8:32" },
    { phrase: "ESFUERZATE Y SE VALIENTE", hint: "JOSUE 1:9" },
    { phrase: "EL SENOR ES MI PASTOR", hint: "SALMO 23:1" },
    { phrase: "EN EL PRINCIPIO ERA EL VERBO", hint: "JUAN 1:1" },
    { phrase: "ORAD SIN CESAR", hint: "1 TESALONICENSES 5:17" },
    { phrase: "LA FE MUEVE MONTANAS", hint: "MATEO 17:20" },
    { phrase: "EN EL PRINCIPIO CREO DIOS LOS CIELOS Y LA TIERRA", hint: "GENESIS 1:1" },
    { phrase: "NO SOLO DE PAN VIVIRA EL HOMBRE", hint: "MATEO 4:4" },
    { phrase: "YO Y EL PADRE UNO SOMOS", hint: "JUAN 10:30" },
    { phrase: "YO SOY EL CAMINO Y LA VERDAD Y LA VIDA", hint: "JUAN 14:6" },
    { phrase: "EL PRINCIPIO DE LA SABIDURIA ES EL TEMOR DE JEHOVA", hint: "PROVERBIOS 1:7" },
    { phrase: "SI DIOS ES POR NOSOTROS QUIEN CONTRA NOSOTROS", hint: "ROMANOS 8:31" },
    { phrase: "POR GRACIA SOIS SALVOS POR MEDIO DE LA FE", hint: "EFESIOS 2:8" },
    { phrase: "YO ESTOY A LA PUERTA Y LLAMO", hint: "APOCALIPSIS 3:20" },
    { phrase: "NO TEMAS PORQUE YO ESTOY CONTIGO", hint: "ISAIAS 41:10" },
    { phrase: "SOBRE TODA COSA GUARDADA GUARDA TU CORAZON", hint: "PROVERBIOS 4:23" },
];


const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const scrambleWord = (challenge: any, type: 'syllables' | 'letters') => {
    let scrambled;
    let original;
    let sourceArray;

    if (type === 'syllables' && challenge.syllables) {
        original = challenge.syllables.join('');
        sourceArray = [...challenge.syllables];
    } else {
        original = challenge.answer;
        sourceArray = challenge.answer.split('');
    }

    if (sourceArray.length <= 1) {
      return original;
    }

    let attempts = 0;
    do {
      scrambled = shuffleArray(sourceArray).join('');
      attempts++;
      if (attempts > 50) { 
        console.warn("Could not scramble word differently after 50 attempts:", original);
        break;
      }
    } while (scrambled === original);

    return scrambled;
}

const generateCompletePhraseChallenge = (challenge: any, difficulty: string) => {
    const words = challenge.fullPhrase.split(' ');
    let missingWords: string[] = [];
    let question = challenge.fullPhrase;

    const wordsToHideCount = difficulty === 'principiante' ? 1 : difficulty === 'discipulo' ? 2 : 3;
    const wordsToHide = [];
    const availableWords = [...words];

    if (difficulty === 'principiante') {
        const lastWord = availableWords.pop() as string;
        wordsToHide.push(lastWord);
    } else {
        for (let i = 0; i < wordsToHideCount && availableWords.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            const wordToHide = availableWords.splice(randomIndex, 1)[0];
            wordsToHide.push(wordToHide);
        }
    }

    missingWords = [...wordsToHide];

    let tempQuestion = challenge.fullPhrase;
    wordsToHide.forEach((word: string) => {
        const placeholder = '_'.repeat(word.length);
        // Replace only the first occurrence to handle repeated words correctly
        tempQuestion = tempQuestion.replace(word, placeholder);
    });
    question = tempQuestion;

    return {
        question,
        answer: missingWords.join(' ').toUpperCase(),
        hint: difficulty === 'principiante' ? challenge.hint : 'Sin Pistas',
        fullAnswer: challenge.fullPhrase,
    };
};

const generateGuessPhraseChallenge = (challenge: any, difficulty: string) => {
    const phrase = challenge.phrase.toUpperCase();
    const uniqueLetters = [...new Set(phrase.replace(/ /g, ''))];
    let preGuessed: string[] = [];
    let hint = challenge.hint;

    if (difficulty === 'principiante') {
        const lettersToReveal = Math.floor(uniqueLetters.length * 0.5);
        preGuessed = shuffleArray(uniqueLetters).slice(0, lettersToReveal);
    } else if (difficulty === 'discipulo') {
        const lettersToReveal = Math.floor(uniqueLetters.length * 0.2);
        preGuessed = shuffleArray(uniqueLetters).slice(0, lettersToReveal);
        hint = 'Sin Pistas';
    } else { // Experto
        hint = 'Sin Pistas';
    }
    
    return {
      ...challenge,
      preGuessed: preGuessed.map(l => normalizeForValidation(l)),
      hint,
    };
};


export default function GamePage() {
  const router = useRouter();
  const { 
    teams, gameMode, isPracticeMode, playSound, 
    updateScore, resetGame, roundTime, updateLives, 
    gameRestarted, difficulty 
  } = useGame();
  
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(roundTime);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // For "Guess the Phrase"
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [letterInput, setLetterInput] = useState('');

  const challenges = useMemo(() => {
    if (!gameMode) return [];

    if (gameMode === 'find-word') {
        const shuffledLevel1 = shuffleArray(findWordLevel1);
        const shuffledLevel2 = shuffleArray(findWordLevel2);
        
        switch (difficulty) {
            case 'principiante':
                return shuffledLevel1.map(challenge => ({
                    ...challenge,
                    question: scrambleWord(challenge, 'syllables'),
                    level: 1, 
                    hint: challenge.hint,
                }));
            case 'discipulo':
                const C_SYLLABLES = 15;
                const C_LETTERS = 15;
                const syllablesPart = shuffledLevel1.slice(0, C_SYLLABLES).map(challenge => ({
                    ...challenge,
                    question: scrambleWord(challenge, 'syllables'),
                    level: 1,
                    hint: 'Adivina la palabra con las sílabas.',
                }));
                const lettersPart = shuffledLevel2.slice(0, C_LETTERS).map(challenge => ({
                    ...challenge,
                    question: scrambleWord(challenge, 'letters'),
                    level: 2,
                    hint: 'Adivina la palabra con las letras.',
                }));
                return shuffleArray([...syllablesPart, ...lettersPart]);
            case 'experto':
                return [...shuffledLevel1, ...shuffledLevel2].map(challenge => ({
                    ...challenge,
                    question: scrambleWord(challenge, 'letters'),
                    level: 2,
                    hint: 'Modo experto: sin pistas.',
                }));
            default:
                 return [];
        }
    }
    
    if (gameMode === 'complete-phrase') {
        return shuffleArray(completePhraseChallenges).map(c => generateCompletePhraseChallenge(c, difficulty));
    }
    
    if (gameMode === 'guess-the-phrase') {
      return shuffleArray(guessPhraseChallenges).map(c => generateGuessPhraseChallenge(c, difficulty));
    }

    return [];
  }, [gameMode, difficulty]);

   useEffect(() => {
    const challenge = challenges[currentChallengeIndex];
    if (gameMode === 'guess-the-phrase' && challenge?.preGuessed) {
      setGuessedLetters(challenge.preGuessed);
    } else {
      setGuessedLetters([]);
    }
  }, [currentChallengeIndex, challenges, gameMode]);


  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(roundTime);
    
    if (isPracticeMode || gameOver || gameMode === 'guess-the-phrase' || !!feedback) {
        return;
    }
    
    timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
                if(timerRef.current) clearInterval(timerRef.current);
                playSound('times-up');
                handleAnswer(false);
                return 0;
            }
            if (prevTime <= 6 && prevTime > 1) {
              playSound('tick');
            }
            return prevTime - 1;
        });
    }, 1000);
  };
  
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
        setGameOver(false);
        setGuessedLetters([]);
        setLetterInput('');
    }
  }, [gameRestarted]);

  if (!gameMode || challenges.length === 0) {
    return null;
  }
  
  const challenge = challenges[currentChallengeIndex];
  const currentTeam = teams[currentTeamIndex];

  const handleNextTurn = () => {
    setFeedback(null);
    setAnswer('');
    // setGuessedLetters([]); Let's not reset this here, useEffect will handle it.
    setLetterInput('');
    
    const nextChallengeIndex = currentChallengeIndex + 1;
    
    if (nextChallengeIndex >= challenges.length) {
        setGameOver(true);
    } else {
        setCurrentChallengeIndex(nextChallengeIndex);
        if (teams.length > 0) {
          setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
        }
    }
  }

  const handleAnswer = (isCorrect: boolean) => {
    if(feedback) return;
    if (timerRef.current) clearInterval(timerRef.current);

    if (isCorrect) {
      playSound('correct');
      setFeedback('correct');
      if(!isPracticeMode) {
        let points = 10;
        if (gameMode === 'guess-the-phrase') points = 20;
        if (gameMode === 'complete-phrase') {
          if (difficulty === 'discipulo') points = 15;
          if (difficulty === 'experto') points = 20;
        }
        updateScore(currentTeamIndex, points);
      }
    } else {
      playSound('incorrect');
      setFeedback('incorrect');
    }
  };
  
  const submitAnswer = () => {
    const isCorrect = normalizeForValidation(answer) === normalizeForValidation(challenge.answer);
    handleAnswer(isCorrect);
  };

  const handleGuessLetter = () => {
    const letter = normalizeForValidation(letterInput);
    if (!letter || letter.length > 1 || guessedLetters.includes(letter)) {
        setLetterInput('');
        return;
    }

    setGuessedLetters([...guessedLetters, letter]);
    setLetterInput('');

    const phrase = challenge.phrase || '';
    if (!normalizeForValidation(phrase).includes(letter)) {
        playSound('incorrect');
        if (!isPracticeMode) {
            const newLives = updateLives(currentTeamIndex, -1);
            if (newLives <= 0) {
                setFeedback('incorrect'); 
            }
        }
    } else {
        playSound('correct');
        const phraseLetters = [...new Set(normalizeForValidation(phrase).replace(/ /g, ''))];
        const revealedLetters = phraseLetters.filter(l => guessedLetters.includes(l));
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
  }
  
  const winner = teams.length > 0 
    ? teams.reduce((prev, current) => (prev.score > current.score) ? prev : current)
    : null;

  if (gameOver) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <GameHeader />
            <Card className="w-full max-w-md text-center animate-scroll-reveal">
                <CardHeader>
                    <CardTitle className="font-headline text-4xl text-primary">¡Juego Terminado!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Trophy className="w-24 h-24 text-primary mx-auto"/>
                    {teams.length > 1 && winner ? (
                      <>
                        <h3 className="text-2xl font-bold">Ganador: {winner.name}</h3>
                        <div className="space-y-2">
                            {teams.sort((a,b) => b.score - a.score).map(team => (
                                <p key={team.name} className="text-lg">{team.name}: {team.score} puntos</p>
                            ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-bold">¡Completaste el desafío!</h3>
                        {teams.length > 0 && <p className="text-lg">Puntuación final: {teams[0].score} puntos</p>}
                      </>
                    )}
                    <Button onClick={() => { resetGame(); router.push('/') }} size="lg">Jugar de Nuevo</Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  const totalChallenges = challenges.length;
  const progress = (currentChallengeIndex / totalChallenges) * 100;
  const currentLevel = (challenge as any).level;
  const fullAnswer = (challenge as any).fullAnswer;

  const renderGuessThePhrase = () => {
    const phrase = (challenge.phrase || '').toUpperCase();
    const displayedPhrase = phrase.split('').map(char => {
        if (char === ' ') return ' ';
        if (guessedLetters.includes(normalizeForValidation(char))) return char;
        return '_';
    }).join('');

    return (
        <div className="w-full space-y-4 animate-scroll-reveal">
            <p className="text-sm text-accent-foreground/70">{challenge.hint}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest font-mono text-foreground p-2">
                {displayedPhrase.split(' ').map((word, i) => <span key={i} className="inline-block mr-4">{word}</span>)}
            </h2>
            <div className="flex gap-2 justify-center">
                <Input
                  value={letterInput}
                  onChange={(e) => setLetterInput(e.target.value.slice(0, 1))}
                  onKeyPress={(e) => e.key === 'Enter' && handleGuessLetter()}
                  placeholder="Adivina una letra"
                  className="text-center text-xl h-14 w-48 border-2 border-primary/50 bg-card/50 focus:border-primary focus:ring-primary/50"
                  disabled={!!feedback}
                  maxLength={1}
                />
                <Button onClick={handleGuessLetter} size="lg" disabled={!letterInput || !!feedback}>Enviar Letra</Button>
            </div>
             <div className="flex gap-2 justify-center">
                 <Input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleGuessPhrase()}
                      placeholder="Adivina la frase completa"
                      className="text-center text-xl h-14 border-2 border-primary/50 bg-card/50 focus:border-primary focus:ring-primary/50"
                      disabled={!!feedback}
                    />
                 <Button onClick={handleGuessPhrase} size="lg" disabled={!answer || !!feedback}>Resolver</Button>
            </div>
            {!isPracticeMode && (
                <div className="flex items-center justify-center gap-2">
                   {Array.from({ length: 5 }).map((_, i) => (
                        <Heart key={i} className={`w-6 h-6 ${i < (currentTeam?.lives ?? 0) ? 'text-red-500 fill-current' : 'text-muted-foreground'}`}/>
                    ))}
                </div>
            )}
        </div>
    );
  };

  const renderDefaultGame = () => (
     <div className="w-full space-y-4 animate-scroll-reveal">
        <p className="text-sm text-accent-foreground/70">{challenge.hint}</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-widest font-headline text-foreground">
            {challenge.question}
        </h2>
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
          placeholder="Escribe tu respuesta aquí"
          className="text-center text-xl h-14 border-2 border-primary/50 bg-card/50 focus:border-primary focus:ring-primary/50"
          disabled={!!feedback}
        />
        <Button onClick={submitAnswer} size="lg" className="w-full text-lg" disabled={!answer || !!feedback}>
          Enviar Respuesta
        </Button>
      </div>
  )

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-background text-foreground flex flex-col p-2 pt-16 md:p-4 md:pt-20">
      <GameHeader />
      
      <div className="flex-grow flex flex-col md:flex-row md:gap-4 overflow-hidden">
        
        {/* Main Game Panel */}
        <main className="flex-grow flex flex-col pb-2 md:pb-0">
          <Card className="flex-grow flex flex-col bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="p-4 bg-primary/5">
              <div className="flex items-center justify-between text-muted-foreground">
                  <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-accent"/>
                      <span className="font-bold text-lg text-primary">{teams[currentTeamIndex]?.name}</span>
                  </div>
                {!isPracticeMode && gameMode !== 'guess-the-phrase' && (
                    <div className="flex items-center gap-2 text-lg font-bold text-accent-foreground/80">
                        <Clock className="w-5 h-5 text-accent"/>
                        <span>{timeLeft}s</span>
                    </div>
                )}
                {currentLevel && gameMode === 'find-word' && (
                    <div className="flex items-center gap-2">
                        {currentLevel === 1 ? <Star className="w-5 h-5 text-yellow-400"/> : <Brain className="w-5 h-5 text-pink-400"/>}
                        <span className="font-semibold text-accent-foreground/80">Nivel {currentLevel}</span>
                    </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center text-center space-y-4 p-4">
              {feedback && (
                  <div className={`w-full animate-fade-in flex flex-col items-center justify-center space-y-4 ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                    {feedback === 'correct' ? 
                        <CheckCircle className="w-16 h-16 mx-auto"/> : <XCircle className="w-16 h-16 mx-auto"/>
                    }
                    <p className="text-2xl font-bold mt-2">{feedback === 'correct' ? '¡Correcto!' : 'Incorrecto'}</p>
                    {feedback === 'incorrect' && <p>La respuesta era: <span className="font-bold text-foreground">{gameMode === 'complete-phrase' ? fullAnswer : (challenge.answer || challenge.phrase)}</span></p>}
                    <Button onClick={handleNextTurn}>Continuar</Button>
                  </div>
              )}
              {!feedback && (
                  gameMode === 'guess-the-phrase' ? renderGuessThePhrase() : renderDefaultGame()
              )}
            </CardContent>
          </Card>
        </main>
        
        {/* Side Panel / Score */}
        <aside className="w-full md:w-1/3 flex flex-col gap-2 md:gap-4">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="p-3 md:p-4 bg-primary/5">
              <CardTitle className="font-headline text-xl md:text-2xl flex items-center gap-2 text-accent-foreground/90">
                <Trophy className="w-6 h-6 text-primary"/>
                Puntuación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3 md:p-4">
              {teams.map((team, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between font-bold text-sm text-muted-foreground">
                    <span>{team.name}</span>
                    <span className="text-foreground">{team.score} pts</span>
                  </div>
                  <Progress value={(team.score / (totalChallenges * 10 / (teams.length || 1)))} />
                </div>
              ))}
            </CardContent>
          </Card>
          
           <Alert className="p-3 md:p-4 bg-card/80 border-primary/20">
                <AlertTitle className="font-bold text-sm text-accent-foreground/80">Progreso</AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground">
                  Desafío {currentChallengeIndex + 1} de {totalChallenges}.
                </AlertDescription>
              <Progress value={progress} className="mt-2 h-2" />
            </Alert>
            
          <footer className="w-full mt-auto">
             <AdBanner className="h-12 md:h-16" />
          </footer>
        </aside>
      </div>
    </div>
  );
}

    

    

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
    { question: "EN EL PRINCIPIO CREO DIOS LOS CIELOS Y LA _____", answer: "TIERRA", hint: "LO OPUESTO AL CIELO." },
    { question: "EL SENOR ES MI PASTOR, NADA ME _____", answer: "FALTARA", hint: "VERBO QUE SIGNIFICA 'CARECER'." },
    { question: "NO SOLO DE PAN VIVIRA EL _____", answer: "HOMBRE", hint: "SER HUMANO DE SEXO MASCULINO." },
    { question: "PEDID, Y SE OS _____", answer: "DARA", hint: "FUTURO DEL VERBO 'DAR'." },
    { question: "YO Y EL PADRE UNO _____", answer: "SOMOS", hint: "PRESENTE DEL VERBO 'SER' PARA 'NOSOTROS'." },
    { question: "PORQUE DE TAL MANERA AMO DIOS AL MUNDO, QUE HA DADO A SU HIJO _____", answer: "UNIGENITO", hint: "HIJO UNICO." },
    { question: "YO SOY EL CAMINO, Y LA VERDAD, Y LA _____", answer: "VIDA", hint: "LO CONTRARIO A LA MUERTE." },
    { question: "TODO LO PUEDO EN CRISTO QUE ME _____", answer: "FORTALECE", hint: "QUE ME DA FUERZA." },
    { question: "LA FE ES LA CERTEZA DE LO QUE SE ESPERA, LA CONVICCION DE LO QUE NO SE _____", answer: "VE", hint: "PERCIBIR CON LOS OJOS." },
    { question: "EL AMOR ES PACIENTE, ES _____", answer: "BONDADOSO", hint: "LLENO DE BONDAD." },
    { question: "DEJAD A LOS NINOS VENIR A MI, Y NO SE LO _____", answer: "IMPIDAIS", hint: "NO PERMITIR ALGO." },
    { question: "VENID A MI TODOS LOS QUE ESTAIS TRABAJADOS Y _____", answer: "CARGADOS", hint: "QUE LLEVAN UNA CARGA PESADA." },
    { question: "DE MAS ESTIMA ES EL BUEN NOMBRE QUE LAS MUCHAS _____", answer: "RIQUEZAS", hint: "ABUNDANCIA DE BIENES Y DINERO." },
    { question: "PORQUE LA PAGA DEL PECADO ES _____", answer: "MUERTE", hint: "FIN DE LA VIDA." },
    { question: "EN LA CASA DE MI PADRE MUCHAS ____ HAY", answer: "MORADAS", hint: "LUGARES PARA VIVIR." },
    { question: "MAS BUSCAD PRIMERAMENTE EL REINO DE DIOS Y SU _____", answer: "JUSTICIA", hint: "PRINCIPIO MORAL DE DAR A CADA UNO LO QUE LE CORRESPONDE." },
    { question: "FIATE DE JEHOVA DE TODO TU CORAZON, Y NO TE APOYES EN TU PROPIA _____", answer: "PRUDENCIA", hint: "SABIDURIA, BUEN JUICIO." },
    { question: "EL PRINCIPIO DE LA SABIDURIA ES EL ____ DE JEHOVA", answer: "TEMOR", hint: "MIEDO RESPETUOSO." },
    { question: "LOS CIELOS CUENTAN LA ____ DE DIOS", answer: "GLORIA", hint: "HONRA, ESPLENDOR." },
    { question: "SI DIOS ES POR NOSOTROS, ¿QUIEN CONTRA ____?", answer: "NOSOTROS", hint: "PRONOMBRE PERSONAL." },
    { question: "ORANDO EN TODO TIEMPO CON TODA ORACION Y _____", answer: "SUPLICA", hint: "RUEGO, PETICION." },
    { question: "EL GOZO DEL SENOR ES VUESTRA _____", answer: "FORTALEZA", hint: "VIGOR, FUERZA." },
    { question: "POR GRACIA SOIS SALVOS POR MEDIO DE LA _____", answer: "FE", hint: "CREENCIA, CONFIANZA." },
    { question: "LA HIERBA SE SECA, Y LA FLOR SE _____", answer: "MARCHITA", hint: "PERDER LA FRESCURA Y EL COLOR." },
    { question: "MI PUEBLO FUE DESTRUIDO PORQUE LE FALTO _____", answer: "CONOCIMIENTO", hint: "SABER, ENTENDIMIENTO." },
    { question: "NO OS CONFORMEIS A ESTE _____", answer: "SIGLO", hint: "MUNDO, EPOCA." },
    { question: "SOMOS HECHURA SUYA, CREADOS EN CRISTO JESUS PARA BUENAS _____", answer: "OBRAS", hint: "ACCIONES, TRABAJOS." },
    { question: "EL QUE NO AMA, NO HA CONOCIDO A _____", answer: "DIOS", hint: "EL SER SUPREMO." },
    { question: "YO ESTOY A LA PUERTA Y _____", answer: "LLAMO", hint: "ACCION DE TOCAR PARA QUE ABRAN." },
    { question: "EL QUE PERSEVERE HASTA EL FIN, ESTE SERA _____", answer: "SALVO", hint: "LIBERADO DE PELIGRO O CONDENACION." },
    { question: "NO TEMAS, PORQUE YO ESTOY _____", answer: "CONTIGO", hint: "A TU LADO." },
    { question: "MI YUGO ES FACIL, Y LIGERA MI _____", answer: "CARGA", hint: "PESO, RESPONSABILIDAD." },
    { question: "EL QUE SE HUMILLA SERA _____", answer: "ENALTECIDO", hint: "LEVANTADO, EXALTADO." },
    { question: "SOBRE TODA COSA GUARDADA, GUARDA TU _____", answer: "CORAZON", hint: "ORGANO DEL AMOR Y LOS SENTIMIENTOS." },
    { question: "LA LAMPARA DEL CUERPO ES EL _____", answer: "OJO", hint: "ORGANO DE LA VISION." },
    { question: "NINGUNO PUEDE SERVIR A DOS _____", answer: "SENORES", hint: "AMOS, DUEÑOS." },
    { question: "EL QUE ESTA EN CRISTO, NUEVA ____ ES", answer: "CRIATURA", hint: "SER CREADO." },
    { question: "MAS LA SENDA DE LOS JUSTOS ES COMO LA LUZ DE LA _____", answer: "AURORA", hint: "PRIMERA LUZ DEL DIA." },
    { question: "NO TE DEJES VENCER DE LO MALO, SINO VENCE CON EL BIEN EL _____", answer: "MAL", hint: "LO CONTRARIO AL BIEN." },
    { question: "HIJO MIO, NO TE OLVIDES DE MI _____", answer: "LEY", hint: "CONJUNTO DE PRECEPTOS." },
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
  let currentIndex = newArray.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
}

const scrambleWord = (challenge: any, level: number) => {
    let scrambled;
    let original;
    let sourceArray;

    if (level === 1) {
        original = challenge.syllables.join('');
        sourceArray = [...challenge.syllables];
    } else {
        original = challenge.answer;
        sourceArray = challenge.answer.split('');
    }

    let attempts = 0;
    do {
      const shuffledArray = shuffleArray(sourceArray);
      scrambled = shuffledArray.join('');
      attempts++;
      // Prevent infinite loops for single-letter/syllable words or unlucky shuffles
      if (attempts > 50) { 
        console.warn("Could not scramble word differently after 50 attempts:", original);
        break;
      }
    } while (scrambled === original && sourceArray.length > 1);

    return scrambled;
}

export default function GamePage() {
  const router = useRouter();
  const { teams, gameMode, isPracticeMode, playSound, updateScore, resetGame, roundTime, updateLives } = useGame();
  
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
    
    let allChallenges;
    if (gameMode === 'find-word') {
        allChallenges = shuffleArray([...findWordLevel1, ...findWordLevel2]);
        return allChallenges.map((challenge) => {
            const level = findWordLevel1.some(c => c.answer === challenge.answer) ? 1 : 2;
            return {
                ...challenge,
                question: scrambleWord(challenge, level),
                level: level,
            };
        });
    } else if (gameMode === 'complete-phrase') {
        allChallenges = shuffleArray([...completePhraseChallenges]);
        return allChallenges;
    } else { // guess-the-phrase
        allChallenges = shuffleArray([...guessPhraseChallenges]);
        return allChallenges;
    }
  }, [gameMode]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(roundTime);
    
    if (isPracticeMode || gameOver || gameMode === 'guess-the-phrase') {
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
            if(prevTime % 10 === 0 || prevTime <= 5){
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
    // Don't start a new timer if there's feedback on screen
    if (!feedback) {
        startTimer();
    }
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameMode, router, currentChallengeIndex, feedback]);

  if (!gameMode || challenges.length === 0) {
    return null;
  }
  
  const challenge = challenges[currentChallengeIndex];
  const currentTeam = teams[currentTeamIndex];

  const handleNextTurn = () => {
    setFeedback(null);
    setAnswer('');
    setGuessedLetters([]);
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
      if(!isPracticeMode) updateScore(currentTeamIndex, 10);
    } else {
      playSound('incorrect');
      setFeedback('incorrect');
    }
  };
  
  const submitAnswer = () => {
    const isCorrect = answer.trim().toUpperCase() === challenge.answer.toUpperCase();
    handleAnswer(isCorrect);
  };

  const handleGuessLetter = () => {
    const letter = letterInput.trim().toUpperCase();
    if (!letter || letter.length > 1 || guessedLetters.includes(letter)) {
        setLetterInput('');
        return;
    }

    setGuessedLetters([...guessedLetters, letter]);
    setLetterInput('');

    const phrase = (challenge.phrase || '').toUpperCase();
    if (!phrase.includes(letter)) {
        playSound('incorrect');
        if (!isPracticeMode) {
            const newLives = updateLives(currentTeamIndex, -1);
            if (newLives <= 0) {
                setFeedback('incorrect'); // Team is out of lives for this round
            }
        }
    } else {
        playSound('correct');
        const phraseLetters = [...new Set(phrase.replace(/ /g, ''))];
        const revealedLetters = phraseLetters.filter(l => guessedLetters.includes(l) || l === letter);
        if (revealedLetters.length === phraseLetters.length) {
            setFeedback('correct');
            if(!isPracticeMode) updateScore(currentTeamIndex, 20); // More points for solving the phrase
        }
    }
    if (teams.length > 1) {
      setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
    }
  };

  const handleGuessPhrase = () => {
      const isCorrect = answer.trim().toUpperCase() === (challenge.phrase || '').toUpperCase();
      if(isCorrect) {
          playSound('correct');
          setFeedback('correct');
          if(!isPracticeMode) updateScore(currentTeamIndex, 20);
      } else {
          playSound('incorrect');
          setFeedback('incorrect');
          if (!isPracticeMode) {
            updateLives(currentTeamIndex, -2); // Penalty for wrong guess
          }
      }
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

  const renderGuessThePhrase = () => {
    const phrase = (challenge.phrase || '').toUpperCase();
    const displayedPhrase = phrase.split('').map(char => {
        if (char === ' ') return ' ';
        if (guessedLetters.includes(char)) return char;
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
                {currentLevel && (
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
                    {feedback === 'incorrect' && <p>La respuesta era: <span className="font-bold text-foreground">{challenge.answer || challenge.phrase}</span></p>}
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

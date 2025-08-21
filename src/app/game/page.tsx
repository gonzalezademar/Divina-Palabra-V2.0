
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { GameHeader } from '@/components/game/GameHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Trophy, CheckCircle, XCircle, Clock, Star, Brain, Users } from 'lucide-react';
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
];

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const scrambleWord = (challenge: any, level: number) => {
    if (level === 1 && challenge.syllables) {
        const shuffledSyllables = shuffleArray([...challenge.syllables]);
        const scrambled = shuffledSyllables.join('');
        return scrambled === challenge.answer ? scrambleWord(challenge, level) : scrambled;
    }
    const letters = challenge.answer.split('');
    const shuffledLetters = shuffleArray(letters);
    const scrambled = shuffledLetters.join('');
    return scrambled === challenge.answer ? scrambleWord(challenge, level) : scrambled;
}

export default function GamePage() {
  const router = useRouter();
  const { teams, gameMode, isPracticeMode, playSound, updateScore, resetGame, roundTime } = useGame();
  
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(roundTime);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const challenges = useMemo(() => {
    if (!gameMode) return [];
    
    if (gameMode === 'find-word') {
        const allChallenges = shuffleArray([...findWordLevel1, ...findWordLevel2]);
        return allChallenges.map((challenge, index) => {
            const level = findWordLevel1.some(c => c.answer === challenge.answer) ? 1 : 2;
            return {
                ...challenge,
                question: scrambleWord(challenge, level),
                level: level,
            };
        });
    } else {
        return shuffleArray([...completePhraseChallenges]);
    }
  }, [gameMode]);

  useEffect(() => {
    if (!gameMode) {
      router.push('/');
    } else {
        setTimeLeft(roundTime);
    }
  }, [gameMode, router, roundTime]);
  
  useEffect(() => {
    if (isPracticeMode || gameOver || feedback) return;

    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((t) => {
            if (t > 1) playSound('tick');
            return t - 1
        });
      }, 1000);
      return () => clearInterval(timer);
    } else {
      playSound('times-up');
      handleAnswer(false);
    }
  }, [timeLeft, isPracticeMode, gameOver, feedback, playSound]);

  if (!gameMode || challenges.length === 0) {
    return null;
  }
  
  const challenge = challenges[currentChallengeIndex];

  const handleAnswer = (isCorrect: boolean) => {
    if(feedback) return;

    if (isCorrect) {
      playSound('correct');
      setFeedback('correct');
      if(!isPracticeMode) updateScore(currentTeamIndex, 10);
    } else {
      playSound('incorrect');
      setFeedback('incorrect');
    }
    
    setTimeout(() => {
        setFeedback(null);
        setAnswer('');
        
        const nextChallengeIndex = currentChallengeIndex + 1;
        
        if (nextChallengeIndex >= challenges.length) {
            setGameOver(true);
        } else {
            setCurrentChallengeIndex(nextChallengeIndex);
            if (teams.length > 0) {
              setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
            }
            setTimeLeft(roundTime);
        }
    }, 2000);
  };
  
  const submitAnswer = () => {
    const isCorrect = answer.trim().toUpperCase() === challenge.answer.toUpperCase();
    handleAnswer(isCorrect);
  };
  
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
  const currentLevel = challenge.level;

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-background text-foreground flex flex-col p-2 pt-16 md:p-4 md:pt-20">
      <GameHeader />
      
      <div className="flex-grow flex flex-col md:flex-row md:gap-4 overflow-hidden">
        
        {/* Main Game Panel */}
        <main className="flex-grow flex flex-col pb-2 md:pb-0">
          <Card className="flex-grow flex flex-col bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="p-4">
              <div className="flex items-center justify-between text-muted-foreground">
                  <div className="flex items-center gap-2">
                      <Users className="w-5 h-5"/>
                      <span className="font-bold text-lg text-primary">{teams[currentTeamIndex]?.name}</span>
                  </div>
                {!isPracticeMode && (
                    <div className="flex items-center gap-2 text-lg">
                        <Clock className="w-5 h-5"/>
                        <span>{timeLeft}s</span>
                    </div>
                )}
                {currentLevel && (
                    <div className="flex items-center gap-2">
                        {currentLevel === 1 ? <Star className="w-5 h-5 text-yellow-400"/> : <Brain className="w-5 h-5 text-pink-400"/>}
                        <span>Nivel {currentLevel}</span>
                    </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center text-center space-y-4 p-4">
              {feedback && (
                  <div className={`w-full animate-fade-in ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                    {feedback === 'correct' ? 
                        <CheckCircle className="w-16 h-16 mx-auto"/> : <XCircle className="w-16 h-16 mx-auto"/>
                    }
                    <p className="text-2xl font-bold mt-2">{feedback === 'correct' ? '¡Correcto!' : 'Incorrecto'}</p>
                    {feedback === 'incorrect' && <p>La respuesta era: {challenge.answer}</p>}
                  </div>
              )}
              {!feedback && (
                  <div className="w-full space-y-4 animate-scroll-reveal">
                    <p className="text-base text-muted-foreground">{challenge.hint}</p>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-widest font-headline text-primary">
                        {challenge.question}
                    </h2>
                    <Input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                      placeholder="Escribe tu respuesta aquí"
                      className="text-center text-xl h-14 border-2 border-primary/50 bg-card/50 focus:border-primary"
                      disabled={!!feedback}
                    />
                    <Button onClick={submitAnswer} size="lg" className="w-full text-lg" disabled={!answer || !!feedback}>
                      Enviar Respuesta
                    </Button>
                  </div>
              )}
            </CardContent>
          </Card>
        </main>
        
        {/* Side Panel / Score */}
        <aside className="w-full md:w-1/3 flex flex-col gap-2 md:gap-4">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="p-3 md:p-4">
              <CardTitle className="font-headline text-xl md:text-2xl flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary"/>
                Puntuación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3 md:p-4">
              {teams.map((team, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between font-bold text-sm">
                    <span>{team.name}</span>
                    <span>{team.score} pts</span>
                  </div>
                  <Progress value={(team.score / (totalChallenges * 10 / (teams.length || 1)))} />
                </div>
              ))}
            </CardContent>
          </Card>
          
           <Alert className="p-3 md:p-4">
                <AlertTitle className="font-bold text-sm">Progreso</AlertTitle>
                <AlertDescription className="text-xs">
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

    

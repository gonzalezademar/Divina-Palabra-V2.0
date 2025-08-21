
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
import { Trophy, CheckCircle, XCircle, Clock } from 'lucide-react';
import { AdBanner } from '@/components/game/AdBanner';

const challengesData = {
  'find-word': [
    // Libros de la biblia (Fácil)
    { question: "SENEGIS", answer: "GENESIS", hint: "EL PRIMER LIBRO DE LA BIBLIA." },
    { question: "XODOE", answer: "EXODO", hint: "EL LIBRO DE LA SALIDA DE EGIPTO." },
    { question: "SOMLAS", answer: "SALMOS", hint: "LIBRO DE CANTOS Y ORACIONES." },
    { question: "NAIC", answer: "CAIN", hint: "HERMANO DE ABEL." },
    { question: "VIDAD", answer: "DAVID", hint: "REY DE ISRAEL QUE DERROTO A UN GIGANTE." },
    { question: "SESIOM", answer: "MOISES", hint: "LIBERO A LOS ISRAELITAS DE LA ESCLAVITUD." },
    { question: "LEBEN", answer: "BELEN", hint: "CIUDAD DEL NACIMIENTO DE JESUS." },
    { question: "ACAR", answer: "ARCA", hint: "LA EMBARCACION QUE CONSTRUYO NOE." },
    // Personajes y lugares (Medio)
    { question: "MARAHAB", answer: "ABRAHAM", hint: "PADRE DE MUCHAS NACIONES." },
    { question: "NOMLOSA", answer: "SALOMON", hint: "EL REY MAS SABIO DE ISRAEL." },
    { question: "TOLASOP", answer: "APOSTOL", hint: "UNO DE LOS DOCE SEGUIDORES DE JESUS." },
    { question: "FEPROTA", answer: "PROFETA", hint: "UN MENSAJERO DE DIOS." },
    { question: "GELAN", answer: "ANGEL", hint: "MENSAJERO CELESTIAL." },
    { question: "LOGIAT", answer: "GOLIAT", hint: "GIGANTE DERROTADO POR DAVID." },
    { question: "NOSANS", answer: "SANSON", hint: "JUEZ DE ISRAEL CON FUERZA SOBRENATURAL." },
    { question: "NAZTERA", answer: "NAZARET", hint: "CIUDAD DONDE CRECIO JESUS." },
    // Conceptos y otros (Difícil)
    { question: "SERTDEIO", answer: "DESIERTO", hint: "LUGAR DONDE JESUS AYUNO 40 DIAS." },
    { question: "BALAPORA", answer: "PARABOLA", hint: "HISTORIA CORTA CON UNA ENSENANZA MORAL." },
    { question: "PLOMET", answer: "TEMPLO", hint: "LUGAR SAGRADO DE ADORACION EN JERUSALEN." },
    { question: "SIAPOCALIPS", answer: "APOCALIPSIS", hint: "EL ULTIMO LIBRO, LLENO DE PROFECIAS." },
  ],
  'complete-phrase': [
    // Frases conocidas (Fácil)
    { question: "EN EL PRINCIPIO CREO DIOS LOS CIELOS Y LA _____", answer: "TIERRA", hint: "LO OPUESTO AL CIELO." },
    { question: "EL SENOR ES MI PASTOR, NADA ME _____", answer: "FALTARA", hint: "VERBO QUE SIGNIFICA 'CARECER'." },
    { question: "NO SOLO DE PAN VIVIRA EL _____", answer: "HOMBRE", hint: "SER HUMANO DE SEXO MASCULINO." },
    { question: "PEDID, Y SE OS _____", answer: "DARA", hint: "FUTURO DEL VERBO 'DAR'." },
    { question: "YO Y EL PADRE UNO _____", answer: "SOMOS", hint: "PRESENTE DEL VERBO 'SER' PARA 'NOSOTROS'." },
    // Enseñanzas (Medio)
    { question: "PORQUE DE TAL MANERA AMO DIOS AL MUNDO, QUE HA DADO A SU HIJO _____", answer: "UNIGENITO", hint: "HIJO UNICO." },
    { question: "YO SOY EL CAMINO, Y LA VERDAD, Y LA _____", answer: "VIDA", hint: "LO CONTRARIO A LA MUERTE." },
    { question: "TODO LO PUEDO EN CRISTO QUE ME _____", answer: "FORTALECE", hint: "QUE ME DA FUERZA." },
    { question: "LA FE ES LA CERTEZA DE LO QUE SE ESPERA, LA CONVICCION DE LO QUE NO SE _____", answer: "VE", hint: "PERCIBIR CON LOS OJOS." },
    { question: "EL AMOR ES PACIENTE, ES _____", answer: "BONDADOSO", hint: "LLENO DE BONDAD." },
    { question: "DEJAD A LOS NINOS VENIR A MI, Y NO SE LO _____", answer: "IMPIDAIS", hint: "NO PERMITIR ALGO." },
    // Conceptos teológicos (Difícil)
    { question: "VENID A MI TODOS LOS QUE ESTAIS TRABAJADOS Y _____", answer: "CARGADOS", hint: "QUE LLEVAN UNA CARGA PESADA." },
    { question: "DE MAS ESTIMA ES EL BUEN NOMBRE QUE LAS MUCHAS _____", answer: "RIQUEZAS", hint: "ABUNDANCIA DE BIENES Y DINERO." },
    { question: "PORQUE LA PAGA DEL PECADO ES _____", answer: "MUERTE", hint: "FIN DE LA VIDA." },
    { question: "EN LA CASA DE MI PADRE MUCHAS ____ HAY", answer: "MORADAS", hint: "LUGARES PARA VIVIR." },
    { question: "MAS BUSCAD PRIMERAMENTE EL REINO DE DIOS Y SU _____", answer: "JUSTICIA", hint: "PRINCIPIO MORAL DE DAR A CADA UNO LO QUE LE CORRESPONDE." },
    { question: "FIATE DE JEHOVA DE TODO TU CORAZON, Y NO TE APOYES EN TU PROPIA _____", answer: "PRUDENCIA", hint: "SABIDURIA, BUEN JUICIO." },
    { question: "EL PRINCIPIO DE LA SABIDURIA ES EL ____ DE JEHOVA", answer: "TEMOR", hint: "MIEDO RESPETUOSO." },
    { question: "LOS CIELOS CUENTAN LA ____ DE DIOS", answer: "GLORIA", hint: "HONRA, ESPLENDOR." },
    { question: "SI DIOS ES POR NOSOTROS, ¿QUIEN CONTRA ____?", answer: "NOSOTROS", hint: "PRONOMBRE PERSONAL." },
  ]
};

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
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
      const gameChallenges = [...challengesData[gameMode]];
      return shuffleArray(gameChallenges);
  }, [gameMode]);

  useEffect(() => {
    if (!gameMode) {
      router.push('/');
    }
  }, [gameMode, router]);
  
  useEffect(() => {
    if (isPracticeMode || feedback || gameOver) return;
    if (timeLeft === 0) {
      playSound('times-up');
      handleAnswer(false);
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isPracticeMode, feedback, gameOver]);

  if (!gameMode || challenges.length === 0) {
    return null;
  }
  
  const challenge = challenges[currentChallengeIndex];

  const handleAnswer = (isCorrect: boolean) => {
    if (feedback) return; 

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
            setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-4 pt-20 md:p-6 md:pt-24">
      <GameHeader />
      <main className="flex-grow flex flex-col md:flex-row gap-6">
        {/* Game Panel */}
        <div className="md:w-2/3 flex flex-col">
          <Card className="flex-grow flex flex-col bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-center">
                {teams.length > 0 && `Turno de: `} <span className="text-primary">{teams[currentTeamIndex]?.name}</span>
              </CardTitle>
              {!isPracticeMode && (
                <div className="flex items-center gap-2 justify-center text-muted-foreground">
                    <Clock className="w-5 h-5"/>
                    <span>Tiempo restante: {timeLeft}s</span>
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
              {feedback && (
                  <div className={`w-full animate-fade-in ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback === 'correct' ? 
                        <CheckCircle className="w-16 h-16 mx-auto"/> : <XCircle className="w-16 h-16 mx-auto"/>
                    }
                    <p className="text-2xl font-bold mt-2">{feedback === 'correct' ? '¡Correcto!' : 'Incorrecto'}</p>
                    {feedback === 'incorrect' && <p>La respuesta era: {challenge.answer}</p>}
                  </div>
              )}
              {!feedback && (
                  <div className="w-full space-y-4 animate-scroll-reveal">
                    <p className="text-lg text-muted-foreground">{challenge.hint}</p>
                    <h2 className="text-4xl font-bold tracking-widest font-headline">
                        {challenge.question}
                    </h2>
                    <Input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                      placeholder="Escribe tu respuesta aquí"
                      className="text-center text-xl h-14"
                      disabled={!!feedback}
                    />
                    <Button onClick={submitAnswer} size="lg" className="w-full text-lg" disabled={!answer || !!feedback}>
                      Enviar Respuesta
                    </Button>
                  </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Stats Panel */}
        <div className="md:w-1/3">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary"/>
                Puntuación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teams.map((team, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>{team.name}</span>
                    <span>{team.score} pts</span>
                  </div>
                  <Progress value={(team.score / (challenges.length * 10 / teams.length))} />
                </div>
              ))}
              <Alert>
                <AlertTitle className="font-bold">Progreso del Juego</AlertTitle>
                <AlertDescription>
                  Desafío {currentChallengeIndex + 1} de {totalChallenges}.
                </AlertDescription>
              </Alert>
              <Progress value={progress} />
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="w-full mt-auto pt-6">
        <AdBanner />
      </footer>
    </div>
  );
}

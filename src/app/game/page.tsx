"use client";

import { useEffect, useState } from 'react';
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

const challenges = {
  'find-word': [
    { question: "SENÉGIS", answer: "GENESIS", hint: "El primer libro de la Biblia." },
    { question: "XODOÉ", answer: "EXODO", hint: "El libro de la salida de Egipto." },
    { question: "SÍAPOCALIPS", answer: "APOCALIPSIS", hint: "El último libro, lleno de profecías." },
  ],
  'complete-phrase': [
    { question: "En el principio creó Dios los cielos y la _____", answer: "TIERRA", hint: "Lo opuesto al cielo." },
    { question: "El Señor es mi pastor, nada me _____", answer: "FALTARA", hint: "Verbo que significa 'carecer'." },
    { question: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida _____", answer: "ETERNA", hint: "Que no tiene fin." },
  ]
};

export default function GamePage() {
  const router = useRouter();
  const { teams, gameMode, isPracticeMode, playSound, updateScore, setGameMode } = useGame();
  
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameMode) {
      router.push('/');
    }
  }, [gameMode, router]);
  
  useEffect(() => {
    if (isPracticeMode || feedback || gameOver) return;
    if (timeLeft === 0) {
      handleAnswer(false);
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isPracticeMode, feedback, gameOver]);

  if (!gameMode) {
    return null;
  }
  
  const currentChallenges = challenges[gameMode];
  const challenge = currentChallenges[currentChallengeIndex];

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      playSound('correct');
      setFeedback('correct');
      updateScore(currentTeamIndex, 10);
    } else {
      playSound('incorrect');
      setFeedback('incorrect');
    }
    
    setTimeout(() => {
        setFeedback(null);
        setAnswer('');
        const nextTeamIndex = (currentTeamIndex + 1) % teams.length;
        
        if (nextTeamIndex === 0) { // A full round of turns is complete
            if (currentChallengeIndex + 1 >= currentChallenges.length) {
                setGameOver(true);
            } else {
                setCurrentChallengeIndex(i => i + 1);
            }
        }
        setCurrentTeamIndex(nextTeamIndex);
        
        if(!gameOver) {
          setTimeLeft(30);
        }
    }, 2000);
  };
  
  const submitAnswer = () => {
    const isCorrect = answer.trim().toUpperCase() === challenge.answer.toUpperCase();
    handleAnswer(isCorrect);
  };
  
  const winner = teams.reduce((prev, current) => (prev.score > current.score) ? prev : current);

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
                    <h3 className="text-2xl font-bold">Ganador: {winner.name}</h3>
                    <div className="space-y-2">
                        {teams.map(team => (
                            <p key={team.name} className="text-lg">{team.name}: {team.score} puntos</p>
                        ))}
                    </div>
                    <Button onClick={() => { setGameMode(null); router.push('/') }} size="lg">Jugar de Nuevo</Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-4 pt-20 md:p-6 md:pt-24">
      <GameHeader />
      <main className="flex-grow flex flex-col md:flex-row gap-6">
        {/* Game Panel */}
        <div className="md:w-2/3 flex flex-col">
          <Card className="flex-grow flex flex-col bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-center">
                Turno de: <span className="text-primary">{teams[currentTeamIndex]?.name}</span>
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
                  <Progress value={(team.score / (currentChallenges.length * 10)) * 100} />
                </div>
              ))}
              <Alert>
                <AlertTitle className="font-bold">Progreso del Juego</AlertTitle>
                <AlertDescription>
                  Ronda {currentChallengeIndex + 1} de {currentChallenges.length}.
                </AlertDescription>
              </Alert>
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


"use client";

import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Volume2, VolumeX, Users, Swords, BookOpen, Crown, BrainCircuit, Scroll, Clock } from 'lucide-react';
import { AdBanner } from '@/components/game/AdBanner';
import { Slider } from '@/components/ui/slider';

export default function HomePage() {
  const router = useRouter();
  const { 
    teams, setTeams, setGameMode, 
    isPracticeMode, setPracticeMode, 
    isSoundOn, toggleSound, playSound, 
    roundTime, setRoundTime 
  } = useGame();

  const handleTeamNameChange = (index: number, name: string) => {
    const newTeams = [...teams];
    newTeams[index].name = name;
    setTeams(newTeams);
  };

  const startGame = (mode: 'find-word' | 'complete-phrase') => {
    playSound('click');
    setGameMode(mode);
    router.push('/game');
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="absolute top-4 right-4">
        <Button onClick={() => { toggleSound() }} variant="ghost" size="icon">
          {isSoundOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
          <span className="sr-only">Toggle Sound</span>
        </Button>
      </div>

      <main className="flex flex-col items-center justify-center text-center w-full max-w-2xl animate-fade-in">
        <Card className="w-full bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl shadow-primary/10">
          <CardHeader className="pt-4 pb-2">
            <div className="flex justify-center items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <Crown className="w-10 h-10 text-primary" />
              <Scroll className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-4xl text-primary">Encuentra la Palabra</CardTitle>
            <p className="text-xs text-muted-foreground">Saludos a Braian y Alexis</p>
            <CardDescription className="text-muted-foreground text-md">Edición Bíblica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-4 pt-2">
            <div className="space-y-3 animate-scroll-reveal" style={{animationDelay: '0.2s'}}>
              <h3 className="font-headline text-xl flex items-center justify-center gap-2 text-accent-foreground/80"><Users className="w-5 h-5 text-accent"/> Configuración de Equipos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {teams.map((team, index) => (
                  <div key={index} className="space-y-1">
                    <Label htmlFor={`team-${index}`} className="text-left text-md text-muted-foreground">Equipo {index + 1}</Label>
                    <Input
                      id={`team-${index}`}
                      value={team.name}
                      onChange={(e) => handleTeamNameChange(index, e.target.value)}
                      className="text-center text-lg border-primary/30"
                      placeholder={`Nombre del Equipo ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 animate-scroll-reveal" style={{animationDelay: '0.4s'}}>
              <h3 className="font-headline text-xl flex items-center justify-center gap-2 text-accent-foreground/80"><Swords className="w-5 h-5 text-accent" /> Elige el Desafío</h3>
              <Tabs defaultValue="find-word" className="w-full max-w-md mx-auto">
                <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted/50">
                  <TabsTrigger value="find-word" className="py-2 text-sm leading-tight data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg h-14 whitespace-normal">Encuentra la Palabra</TabsTrigger>
                  <TabsTrigger value="complete-phrase" className="py-2 text-sm leading-tight data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg h-14 whitespace-normal">Completa la Frase</TabsTrigger>
                </TabsList>
                <TabsContent value="find-word" className="pt-2">
                  <p className="text-muted-foreground text-sm">Descifra las palabras bíblicas revueltas. ¡Pon a prueba tu agilidad mental!</p>
                  <Button onClick={() => startGame('find-word')} size="lg" className="mt-3 w-full font-bold text-lg">Jugar a Encontrar</Button>
                </TabsContent>
                <TabsContent value="complete-phrase" className="pt-2">
                   <p className="text-muted-foreground text-sm">Completa los versículos y frases célebres de la Biblia. ¿Recuerdas cómo terminan?</p>
                   <Button onClick={() => startGame('complete-phrase')} size="lg" className="mt-3 w-full font-bold text-lg">Jugar a Completar</Button>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-4 bg-primary/5">
              <div className="flex items-center space-x-2 animate-scroll-reveal" style={{animationDelay: '0.6s'}}>
                <BrainCircuit className="w-6 h-6 text-primary" />
                <Label htmlFor="practice-mode" className="text-md text-muted-foreground">Modo Práctica (sin tiempo)</Label>
                <Switch
                  id="practice-mode"
                  checked={isPracticeMode}
                  onCheckedChange={setPracticeMode}
                />
              </div>
              <div className="w-full space-y-2 animate-scroll-reveal" style={{animationDelay: '0.8s'}}>
                <Label htmlFor="round-time" className="text-md flex items-center justify-center gap-2 text-muted-foreground"><Clock className="w-5 h-5 text-primary" /> Tiempo de Ronda: {roundTime}s</Label>
                <Slider
                  id="round-time"
                  min={5}
                  max={60}
                  step={5}
                  value={[roundTime]}
                  onValueChange={(value) => setRoundTime(value[0])}
                  disabled={isPracticeMode}
                />
              </div>
          </CardFooter>
        </Card>
      </main>
      <footer className="w-full max-w-2xl mt-4">
        <AdBanner />
      </footer>
    </div>
  );
}

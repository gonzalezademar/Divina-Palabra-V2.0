"use client";

import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Volume2, VolumeX, Users, Swords, BrainCircuit, Clock, Star, Award, Shield } from 'lucide-react';
import { AdBanner } from '@/components/game/AdBanner';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { InstitutionalLogo } from '@/components/common/InstitutionalLogo';

export default function SetupPage() {
  const router = useRouter();
  const { 
    teams, setTeams, setGameMode, 
    isPracticeMode, setPracticeMode, 
    isSoundOn, toggleSound, playSound, 
    roundTime, setRoundTime,
    difficulty, setDifficulty
  } = useGame();

  const handleTeamNameChange = (index: number, name: string) => {
    const newTeams = [...teams];
    newTeams[index].name = name;
    setTeams(newTeams);
  };

  const startGame = (mode: 'find-word' | 'complete-phrase' | 'guess-the-phrase') => {
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
          <CardHeader className="pt-4 pb-2 text-center">
            <div className="flex justify-center items-center gap-4 mb-2">
                <InstitutionalLogo className="w-16 h-16" />
                <div className="text-left">
                    <p className="font-bold text-accent-foreground/90">Fundacion Anawin</p>
                    <p className="text-sm text-muted-foreground">“Ayudando a SER y a CRECER”</p>
                </div>
            </div>
            <div className="border-b border-border/50 w-3/4 mx-auto my-2"></div>
            <CardTitle className="font-headline text-2xl text-primary">Divina Palabra</CardTitle>
            <CardDescription className="text-muted-foreground text-md">Edición Bíblica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-4 pt-2">
            <div className="space-y-3 animate-scroll-reveal" style={{animationDelay: '0.2s'}}>
              <h3 className="font-headline text-lg flex items-center justify-center gap-2 text-accent-foreground/80"><Users className="w-5 h-5 text-accent"/> Configuración de Equipos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teams.map((team, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Label htmlFor={`team-${index}`} className="text-sm text-muted-foreground whitespace-nowrap">Equipo {index + 1}</Label>
                    <Input
                      id={`team-${index}`}
                      value={team.name}
                      onChange={(e) => handleTeamNameChange(index, e.target.value)}
                      className="text-center text-lg border-primary/30 flex-grow"
                      placeholder={`Nombre`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 animate-scroll-reveal" style={{animationDelay: '0.4s'}}>
              <h3 className="font-headline text-lg flex items-center justify-center gap-2 text-accent-foreground/80"><Shield className="w-5 h-5 text-accent" /> Nivel de Dificultad</h3>
              <RadioGroup defaultValue={difficulty} onValueChange={setDifficulty} className="grid grid-cols-3 gap-4">
                  <div>
                      <RadioGroupItem value="principiante" id="principiante" className="sr-only" />
                      <Label htmlFor="principiante" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary">
                          <Star className="mb-3 h-6 w-6" />
                          Principiante
                      </Label>
                  </div>
                  <div>
                      <RadioGroupItem value="discipulo" id="discipulo" className="sr-only" />
                      <Label htmlFor="discipulo" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary">
                          <Award className="mb-3 h-6 w-6" />
                          Discípulo
                      </Label>
                  </div>
                  <div>
                      <RadioGroupItem value="experto" id="experto" className="sr-only" />
                      <Label htmlFor="experto" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary">
                          <BrainCircuit className="mb-3 h-6 w-6" />
                          Experto
                      </Label>
                  </div>
              </RadioGroup>
            </div>

            <div className="space-y-3 animate-scroll-reveal" style={{animationDelay: '0.6s'}}>
              <h3 className="font-headline text-lg flex items-center justify-center gap-2 text-accent-foreground/80"><Swords className="w-5 h-5 text-accent" /> Elige el Desafío</h3>
              <Tabs defaultValue="find-word" className="w-full max-w-md mx-auto">
                <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50">
                  <TabsTrigger value="find-word" className="data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg h-16 whitespace-normal bg-transparent">Encuentra la Palabra</TabsTrigger>
                  <TabsTrigger value="complete-phrase" className="data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg h-16 whitespace-normal bg-transparent">Completa la Frase</TabsTrigger>
                   <TabsTrigger value="guess-the-phrase" className="data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg h-16 whitespace-normal bg-transparent">Adivina la Frase</TabsTrigger>
                </TabsList>
                <TabsContent value="find-word" className="pt-2">
                  <p className="text-muted-foreground text-sm">Descifra las palabras bíblicas revueltas. ¡La dificultad varía según el nivel que elijas!</p>
                  <Button onClick={() => startGame('find-word')} size="lg" className="mt-3 w-full font-bold text-lg">Jugar a Encontrar</Button>
                </TabsContent>
                <TabsContent value="complete-phrase" className="pt-2">
                   <p className="text-muted-foreground text-sm">Completa los versículos y frases célebres de la Biblia. ¿Recuerdas cómo terminan?</p>
                   <Button onClick={() => startGame('complete-phrase')} size="lg" className="mt-3 w-full font-bold text-lg">Jugar a Completar</Button>
                </TabsContent>
                 <TabsContent value="guess-the-phrase" className="pt-2">
                   <p className="text-muted-foreground text-sm">Adivina la frase oculta letra por letra. ¡Como el ahorcado!</p>
                   <Button onClick={() => startGame('guess-the-phrase')} size="lg" className="mt-3 w-full font-bold text-lg">Jugar a Adivinar</Button>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-4 bg-primary/5">
              <div className="flex items-center space-x-2 animate-scroll-reveal" style={{animationDelay: '0.8s'}}>
                <BrainCircuit className="w-6 h-6 text-primary" />
                <Label htmlFor="practice-mode" className="text-md text-muted-foreground">Modo Práctica (sin tiempo)</Label>
                <Switch
                  id="practice-mode"
                  checked={isPracticeMode}
                  onCheckedChange={setPracticeMode}
                />
              </div>
              <div className="w-full space-y-2 animate-scroll-reveal" style={{animationDelay: '1s'}}>
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

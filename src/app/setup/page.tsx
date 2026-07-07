"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Volume2, VolumeX, Users, Swords, BrainCircuit, Clock, Star, Award, Shield, ArrowLeft, BookOpen } from 'lucide-react';
import { AdBanner } from '@/components/game/AdBanner';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { InstitutionalLogo } from '@/components/common/InstitutionalLogo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SetupPage() {
  const router = useRouter();
  const { 
    teams, setTeams, setGameMode, 
    isPracticeMode, setPracticeMode, 
    isSoundOn, toggleSound, playSound, 
    roundTime, setRoundTime,
    difficulty, setDifficulty,
    bibleVersion, setBibleVersion,
    doctrinalProfile, setDoctrinalProfile,
    t, isPremium, language
  } = useGame();

  const [activeTab, setActiveTab] = useState<'find-word' | 'complete-phrase' | 'guess-the-phrase' | 'bible-rosco' | 'word-search' | 'counseling-practical'>('find-word');

  const handleTabChange = (value: 'find-word' | 'complete-phrase' | 'guess-the-phrase' | 'bible-rosco' | 'word-search' | 'counseling-practical') => {
    playSound('click');
    setActiveTab(value);
    if (value === 'bible-rosco') {
      setRoundTime(150);
    } else {
      setRoundTime(30);
    }
  };

  const handleTeamNameChange = (index: number, name: string) => {
    const newTeams = [...teams];
    if (newTeams[index]) {
      newTeams[index].name = name;
      setTeams(newTeams);
    }
  };

  const startGame = (mode: 'find-word' | 'complete-phrase' | 'guess-the-phrase' | 'bible-rosco' | 'word-search' | 'counseling-practical') => {
    playSound('click');
    setGameMode(mode);
    router.push('/game');
  };

  const handleBack = () => {
    playSound('click');
    router.push('/');
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Header controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Button onClick={handleBack} variant="ghost" size="sm" className="text-slate-400 hover:text-white flex items-center gap-1">
          <ArrowLeft className="h-5 w-5" />
          {t.game.home_sr}
        </Button>
        <Button onClick={() => { toggleSound() }} variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          {isSoundOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
          <span className="sr-only">Toggle Sound</span>
        </Button>
      </div>

      <main className="flex flex-col items-center justify-center text-center w-full max-w-2xl animate-fade-in z-10 mt-12 md:mt-0">
        <Card className="w-full bg-slate-900/80 backdrop-blur-md border-primary/30 shadow-2xl shadow-primary/5 rounded-3xl overflow-hidden">
          {/* Top golden border ribbon */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />

          <CardHeader className="pt-6 pb-2 text-center">
            <div className="flex justify-center items-center gap-3 mb-2">
                <InstitutionalLogo className="w-14 h-14" />
                <div className="text-left">
                    <CardTitle className="font-headline text-2xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-yellow-500">{t.welcome.title}</CardTitle>
                    <CardDescription className="text-sky-300/80 text-xs tracking-wider uppercase">{t.welcome.subtitle}</CardDescription>
                </div>
            </div>
            <div className="border-b border-slate-800 w-3/4 mx-auto my-2"></div>
            <h2 className="text-xl font-bold text-slate-100">{t.setup.title}</h2>
          </CardHeader>
          
          <CardContent className="space-y-6 p-4 pt-2">
            {/* Team Configuration (Fixed visual cards for Amber and Sky Blue teams) */}
            <div className="space-y-3 animate-scroll-reveal" style={{animationDelay: '0.2s'}}>
              <h3 className="font-headline text-base font-bold flex items-center justify-center gap-2 text-amber-300/95">
                <Users className="w-5 h-5 text-amber-400"/>
                {language === 'es' ? 'Identidad de Equipos' : 'Team Identity'}
              </h3>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="flex flex-col items-center p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
                  <div className="w-4 h-4 rounded-full bg-amber-500 animate-pulse shadow-lg shadow-amber-500/20" />
                  <span className="text-sm font-black tracking-wide uppercase">
                    {language === 'es' ? 'Equipo Ámbar' : 'Amber Team'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {language === 'es' ? 'Turno 1 / Color Oro' : 'Turn 1 / Gold Color'}
                  </span>
                </div>
                <div className="flex flex-col items-center p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-300 space-y-1">
                  <div className="w-4 h-4 rounded-full bg-sky-500 animate-pulse shadow-lg shadow-sky-500/20" />
                  <span className="text-sm font-black tracking-wide uppercase">
                    {language === 'es' ? 'Equipo Celeste' : 'Sky Blue Team'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {language === 'es' ? 'Turno 2 / Color Cielo' : 'Turn 2 / Sky Color'}
                  </span>
                </div>
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-3 animate-scroll-reveal" style={{animationDelay: '0.4s'}}>
              <h3 className="font-headline text-base font-bold flex items-center justify-center gap-2 text-amber-300/95">
                <Shield className="w-5 h-5 text-amber-400" />
                {t.setup.difficulty_title}
              </h3>
              <RadioGroup defaultValue={difficulty} onValueChange={setDifficulty as any} className="grid grid-cols-3 gap-3">
                  <div>
                      <RadioGroupItem value="principiante" id="principiante" className="sr-only" />
                      <Label htmlFor="principiante" className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 min-h-[100px] hover:bg-slate-800 hover:text-white cursor-pointer transition-all duration-300 [&:has([data-state=checked])]:border-amber-500 ${difficulty === 'principiante' ? 'border-amber-500 bg-slate-800/80 text-amber-300 font-black' : 'border-slate-800 bg-slate-950/40 text-slate-400'}`}>
                          <Star className="mb-2 h-6 w-6 fill-current text-amber-400" />
                          <span className="text-sm font-bold">{t.setup.diff_beginner}</span>
                      </Label>
                  </div>
                  <div>
                      <RadioGroupItem value="discipulo" id="discipulo" className="sr-only" />
                      <Label htmlFor="discipulo" className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 min-h-[100px] hover:bg-slate-800 hover:text-white cursor-pointer transition-all duration-300 [&:has([data-state=checked])]:border-amber-500 ${difficulty === 'discipulo' ? 'border-amber-500 bg-slate-800/80 text-amber-300 font-black' : 'border-slate-800 bg-slate-950/40 text-slate-400'}`}>
                          <Award className="mb-2 h-6 w-6 fill-current text-amber-400" />
                          <span className="text-sm font-bold">{t.setup.diff_disciple}</span>
                      </Label>
                  </div>
                  <div>
                      <RadioGroupItem value="avanzado" id="avanzado" className="sr-only" />
                      <Label htmlFor="avanzado" className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 min-h-[100px] hover:bg-slate-800 hover:text-white cursor-pointer transition-all duration-300 [&:has([data-state=checked])]:border-amber-500 ${difficulty === 'avanzado' ? 'border-amber-500 bg-slate-800/80 text-amber-300 font-black' : 'border-slate-800 bg-slate-950/40 text-slate-400'}`}>
                          <BrainCircuit className="mb-2 h-6 w-6 fill-current text-amber-400" />
                          <span className="text-sm font-bold">{t.setup.diff_expert}</span>
                      </Label>
                  </div>
              </RadioGroup>
            </div>

            {/* Bible Version Selection */}
            <div className="space-y-3 animate-scroll-reveal" style={{animationDelay: '0.5s'}}>
              <h3 className="font-headline text-base font-bold flex items-center justify-center gap-2 text-amber-300/95">
                <BookOpen className="w-5 h-5 text-amber-400" />
                {t.setup.bible_version}
              </h3>
              <Select value={bibleVersion} onValueChange={(val: string) => { playSound('click'); setBibleVersion(val); }}>
                <SelectTrigger className="w-full max-w-md mx-auto bg-slate-950 border-slate-800 text-sm text-amber-300 h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                  {language === 'es' ? (
                    <>
                      <SelectItem value="rvr1960" className="focus:bg-amber-500 focus:text-slate-950 py-3 text-sm">Reina-Valera 1960 (No requiere Internet)</SelectItem>
                      <SelectItem value="nvi" className="focus:bg-amber-500 focus:text-slate-950 py-3 text-sm">Nueva Versión Internacional (No requiere Internet)</SelectItem>
                      <SelectItem value="ntv" className="focus:bg-amber-500 focus:text-slate-950 py-3 text-sm">Nueva Traducción Viviente (No requiere Internet)</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="kjv" className="focus:bg-amber-500 focus:text-slate-950 py-3 text-sm">King James Version (No Internet required)</SelectItem>
                      <SelectItem value="niv" className="focus:bg-amber-500 focus:text-slate-950 py-3 text-sm">New International Version (No Internet required)</SelectItem>
                      <SelectItem value="esv" className="focus:bg-amber-500 focus:text-slate-950 py-3 text-sm">English Standard Version (No Internet required)</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Doctrinal Profile Selection */}
            <div className="space-y-3 animate-scroll-reveal" style={{animationDelay: '0.55s'}}>
              <h3 className="font-headline text-base font-bold flex items-center justify-center gap-2 text-amber-300/95">
                <BookOpen className="w-5 h-5 text-amber-400" />
                {language === 'es' ? 'Perfil Doctrinal' : 'Doctrinal Profile'}
              </h3>
              <Select value={doctrinalProfile || 'universal'} onValueChange={(val: string) => { playSound('click'); setDoctrinalProfile(val === 'universal' ? undefined : val); }}>
                <SelectTrigger className="w-full max-w-md mx-auto bg-slate-950 border-slate-800 text-sm text-amber-300 h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                  <SelectItem value="universal" className="focus:bg-amber-500 focus:text-slate-950 py-3 text-sm">{language === 'es' ? 'Universal (Todas)' : 'Universal (All)'}</SelectItem>
                  <SelectItem value="evangelico" className="focus:bg-amber-500 focus:text-slate-950 py-3 text-sm">{language === 'es' ? 'Evangélico' : 'Evangelical'}</SelectItem>
                  <SelectItem value="catolico" className="focus:bg-amber-500 focus:text-slate-950 py-3 text-sm">{language === 'es' ? 'Católico' : 'Catholic'}</SelectItem>
                  <SelectItem value="adventista" className="focus:bg-amber-500 focus:text-slate-950 py-3 text-sm">{language === 'es' ? 'Adventista' : 'Adventist'}</SelectItem>
                  <SelectItem value="bautista" className="focus:bg-amber-500 focus:text-slate-950 py-3 text-sm">{language === 'es' ? 'Bautista' : 'Baptist'}</SelectItem>
                  <SelectItem value="pentecostal" className="focus:bg-amber-500 focus:text-slate-950 py-3 text-sm">{language === 'es' ? 'Pentecostal' : 'Pentecostal'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Choose the Challenge Mode */}
            <div className="space-y-3 animate-scroll-reveal" style={{animationDelay: '0.6s'}}>
              <h3 className="font-headline text-base font-bold flex items-center justify-center gap-2 text-amber-300/95">
                <Swords className="w-5 h-5 text-amber-400" />
                {t.setup.mode_title}
              </h3>
              <Tabs value={activeTab} onValueChange={(val: any) => handleTabChange(val)} className="w-full max-w-md mx-auto">
                <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-slate-950/80 border border-slate-800 rounded-xl gap-1">
                  <TabsTrigger value="find-word" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-slate-950 data-[state=active]:shadow-lg h-14 whitespace-normal text-xs bg-transparent rounded-lg text-slate-400 font-semibold transition-all">
                    {t.setup.mode_find_word}
                  </TabsTrigger>
                  <TabsTrigger value="complete-phrase" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-slate-950 data-[state=active]:shadow-lg h-14 whitespace-normal text-xs bg-transparent rounded-lg text-slate-400 font-semibold transition-all">
                    {t.setup.mode_complete_phrase}
                  </TabsTrigger>
                  <TabsTrigger value="guess-the-phrase" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-slate-950 data-[state=active]:shadow-lg h-14 whitespace-normal text-xs bg-transparent rounded-lg text-slate-400 font-semibold transition-all">
                    {t.setup.mode_guess_phrase}
                  </TabsTrigger>
                  <TabsTrigger value="bible-rosco" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-slate-950 data-[state=active]:shadow-lg h-14 whitespace-normal text-xs bg-transparent rounded-lg text-slate-400 font-semibold transition-all">
                    {t.game.rosco_title || t.setup.mode_rosco}
                  </TabsTrigger>
                  <TabsTrigger value="word-search" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-slate-950 data-[state=active]:shadow-lg h-14 whitespace-normal text-xs bg-transparent rounded-lg text-slate-400 font-semibold transition-all">
                    {t.game.word_search || t.setup.mode_word_search}
                  </TabsTrigger>
                  <TabsTrigger value="counseling-practical" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-slate-950 data-[state=active]:shadow-lg h-14 whitespace-normal text-xs bg-transparent rounded-lg text-slate-400 font-semibold transition-all">
                    {t.game.counseling || t.setup.mode_counseling}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="find-word" className="pt-3">
                  <p className="text-slate-400 text-xs md:text-sm">
                    {language === 'es' 
                      ? 'Descifra las palabras bíblicas revueltas. ¡La dificultad varía según el nivel que elijas!'
                      : 'Decipher the scrambled Bible words. Difficulty varies based on selected level!'
                    }
                  </p>
                  <Button onClick={() => startGame('find-word')} size="lg" className="mt-3 w-full font-bold text-base bg-amber-500 text-slate-950 hover:bg-amber-600 rounded-xl">
                    {t.setup.start_game}
                  </Button>
                </TabsContent>
                
                <TabsContent value="complete-phrase" className="pt-3">
                   <p className="text-slate-400 text-xs md:text-sm">
                     {language === 'es'
                       ? 'Completa los versículos y frases célebres de la Biblia. ¿Recuerdas cómo terminan?'
                       : 'Complete the verses and famous phrases of the Bible. Do you remember how they end?'
                     }
                   </p>
                   <Button onClick={() => startGame('complete-phrase')} size="lg" className="mt-3 w-full font-bold text-base bg-amber-500 text-slate-950 hover:bg-amber-600 rounded-xl">
                     {t.setup.start_game}
                   </Button>
                </TabsContent>
                
                <TabsContent value="guess-the-phrase" className="pt-3">
                   <p className="text-slate-400 text-xs md:text-sm">
                     {language === 'es'
                       ? 'Descubre la frase oculta letra por letra revelando el versículo bíblico.'
                       : 'Discover the hidden phrase letter by letter to reveal the Bible verse.'
                     }
                   </p>
                   <Button onClick={() => startGame('guess-the-phrase')} size="lg" className="mt-3 w-full font-bold text-base bg-amber-500 text-slate-950 hover:bg-amber-600 rounded-xl">
                     {t.setup.start_game}
                   </Button>
                </TabsContent>

                <TabsContent value="bible-rosco" className="pt-3">
                   <p className="text-slate-400 text-xs md:text-sm">
                     {language === 'es'
                       ? 'Resuelve el abecedario bíblico de la A a la Z respondiendo términos teológicos e históricos.'
                       : 'Resolve the A to Z biblical wheel answering theological and historical terms.'
                     }
                   </p>
                   <Button onClick={() => startGame('bible-rosco')} size="lg" className="mt-3 w-full font-bold text-base bg-amber-500 text-slate-950 hover:bg-amber-600 rounded-xl">
                     {t.setup.start_game}
                   </Button>
                </TabsContent>

                <TabsContent value="word-search" className="pt-3">
                   <p className="text-slate-400 text-xs md:text-sm">
                     {language === 'es'
                       ? 'Busca términos sagrados en sopas de letras o clasifica libros por testamentos y secciones.'
                       : 'Find sacred words in word searches or classify books by testaments and sections.'
                     }
                   </p>
                   <Button onClick={() => startGame('word-search')} size="lg" className="mt-3 w-full font-bold text-base bg-amber-500 text-slate-950 hover:bg-amber-600 rounded-xl">
                     {t.setup.start_game}
                   </Button>
                </TabsContent>

                <TabsContent value="counseling-practical" className="pt-3">
                   <p className="text-slate-400 text-xs md:text-sm">
                     {language === 'es'
                       ? 'Resuelve dilemas reales aplicando consejos prácticos basados rigurosamente en las Escrituras.'
                       : 'Solve real-life dilemmas applying practical counsel rigorously based on Scripture.'
                     }
                   </p>
                   <Button onClick={() => startGame('counseling-practical')} size="lg" className="mt-3 w-full font-bold text-base bg-amber-500 text-slate-950 hover:bg-amber-600 rounded-xl">
                     {t.setup.start_game}
                   </Button>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4 p-4 bg-slate-950/40 border-t border-slate-800">
              <div className="flex items-center space-x-3 animate-scroll-reveal" style={{animationDelay: '0.8s'}}>
                <BrainCircuit className="w-5 h-5 text-amber-400" />
                <Label htmlFor="practice-mode" className="text-sm font-semibold text-slate-300">
                  {t.setup.practice_mode}
                </Label>
                <Switch
                  id="practice-mode"
                  checked={isPracticeMode}
                  onCheckedChange={setPracticeMode}
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>
              
              <div className="w-full space-y-2 animate-scroll-reveal" style={{animationDelay: '1s'}}>
                <Label htmlFor="round-time" className="text-sm flex items-center justify-center gap-2 text-slate-300 font-semibold">
                  <Clock className="w-4 h-4 text-amber-400" />
                  {t.setup.round_time}: {roundTime}s
                </Label>
                <Slider
                  id="round-time"
                  min={activeTab === 'bible-rosco' ? 60 : 5}
                  max={activeTab === 'bible-rosco' ? 300 : 60}
                  step={activeTab === 'bible-rosco' ? 10 : 5}
                  value={[roundTime]}
                  onValueChange={(value) => setRoundTime(value[0])}
                  disabled={isPracticeMode}
                  className="w-full max-w-md mx-auto"
                />
              </div>
          </CardFooter>
        </Card>
      </main>
      
      {!isPremium && (
        <footer className="w-full max-w-2xl mt-6">
          <AdBanner />
        </footer>
      )}
    </div>
  );
}

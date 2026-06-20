"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { InstitutionalLogo } from '@/components/common/InstitutionalLogo';
import { ArrowLeft, Copy, Check, Share2, Plus, Trash2, Award, Star, BrainCircuit, School, BookOpen } from 'lucide-react';
import { getBibleData } from '@/data/bibleData';

export default function TeacherPage() {
  const router = useRouter();
  const { playSound, language, t } = useGame();
  
  // Lesson Creation States
  const [lessonName, setLessonName] = useState('');
  const [lessonLang, setLessonLang] = useState<'es' | 'en'>(language);
  const [lessonVersion, setLessonVersion] = useState(language === 'es' ? 'rvr1960' : 'niv');
  const [lessonDifficulty, setLessonDifficulty] = useState<'principiante' | 'discipulo' | 'avanzado'>('principiante');
  const [lessonMode, setLessonMode] = useState<'find-word' | 'complete-phrase' | 'guess-the-phrase'>('find-word');
  const [reflectionQuestion, setReflectionQuestion] = useState('');
  const [selectedChallenges, setSelectedChallenges] = useState<any[]>([]);

  // Generated URL State
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync version defaults when language changes
  useEffect(() => {
    setLessonVersion(lessonLang === 'es' ? 'rvr1960' : 'niv');
    setSelectedChallenges([]);
  }, [lessonLang]);

  useEffect(() => {
    setSelectedChallenges([]);
  }, [lessonMode, lessonVersion]);

  // Load available challenges for selection
  const availableChallenges = (() => {
    const data = getBibleData(lessonLang, lessonVersion);
    if (lessonMode === 'find-word') {
      return [...data.findWordLevel1, ...data.findWordLevel2];
    } else if (lessonMode === 'complete-phrase') {
      return data.completePhraseChallenges;
    } else {
      return data.guessPhraseChallenges;
    }
  })();

  const toggleChallengeSelection = (item: any) => {
    playSound('click');
    const isSelected = selectedChallenges.some(
      c => (c.answer && c.answer === item.answer) || 
           (c.fullPhrase && c.fullPhrase === item.fullPhrase) || 
           (c.phrase && c.phrase === item.phrase)
    );

    if (isSelected) {
      setSelectedChallenges(selectedChallenges.filter(
        c => !((c.answer && c.answer === item.answer) || 
               (c.fullPhrase && c.fullPhrase === item.fullPhrase) || 
               (c.phrase && c.phrase === item.phrase))
      ));
    } else {
      if (selectedChallenges.length >= 5) {
        // Limit to 5 challenges
        return;
      }
      setSelectedChallenges([...selectedChallenges, item]);
    }
  };

  const generateLessonLink = () => {
    playSound('correct');
    
    // Construct Lesson Config
    const lessonConfig = {
      lessonName: lessonName || (lessonLang === 'es' ? 'Lección Bíblica' : 'Bible Lesson'),
      difficulty: lessonDifficulty,
      bibleVersion: lessonVersion,
      language: lessonLang,
      challenges: selectedChallenges.length > 0 ? selectedChallenges : availableChallenges.slice(0, 5),
      reflectionQuestion: reflectionQuestion || (lessonLang === 'es' ? '¿Qué aprendiste de esta lección?' : 'What did you learn from this lesson?')
    };

    // Serialize and encode Base64
    const jsonString = JSON.stringify(lessonConfig);
    const base64Code = btoa(unescape(encodeURIComponent(jsonString)));
    
    // Generate URL
    const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
    const shareUrl = `${baseUrl}/game?lesson=${base64Code}`;
    setGeneratedUrl(shareUrl);
    setCopied(false);
  };

  const handleCopy = () => {
    playSound('click');
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    playSound('click');
    const message = lessonLang === 'es' 
      ? `Hola alumnos, aquí está la tarea bíblica: "${lessonName || 'Lección'}". Haz clic en el enlace para realizar la actividad y completar tu reflexión: ${generatedUrl}`
      : `Hello students, here is the Bible assignment: "${lessonName || 'Lesson'}". Click the link to complete the activity and write your reflection: ${generatedUrl}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBack = () => {
    playSound('click');
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Button onClick={handleBack} variant="ghost" size="sm" className="text-slate-400 hover:text-white flex items-center gap-1">
          <ArrowLeft className="h-5 w-5" />
          {t.game.back_to_menu}
        </Button>
      </div>

      <main className="flex flex-col items-center justify-center w-full max-w-2xl animate-fade-in z-10 mt-14 mb-8">
        <Card className="w-full bg-slate-900/80 backdrop-blur-md border-primary/30 shadow-2xl rounded-3xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />
          
          <CardHeader className="pt-6 pb-2 text-center">
            <div className="flex justify-center items-center gap-3 mb-2">
              <InstitutionalLogo className="w-14 h-14" />
              <div className="text-left">
                <CardTitle className="font-headline text-2xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-yellow-500 flex items-center gap-1.5">
                  <School className="w-6 h-6 text-amber-400" />
                  {t.classroom.title}
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs mt-0.5">
                  {lessonLang === 'es' ? 'Herramienta de Lecciones Virtuales para Ministros y Educadores' : 'Virtual Lesson Tool for Ministers and Educators'}
                </CardDescription>
              </div>
            </div>
            <div className="border-b border-slate-800 w-3/4 mx-auto my-2"></div>
            <p className="text-slate-300 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
              {t.classroom.description}
            </p>
          </CardHeader>

          <CardContent className="space-y-5 p-6">
            {/* Lesson details form */}
            <div className="space-y-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              {/* Lesson Name */}
              <div className="space-y-1.5">
                <Label htmlFor="lesson-name" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.classroom.lesson_name}
                </Label>
                <Input
                  id="lesson-name"
                  value={lessonName}
                  onChange={(e) => setLessonName(e.target.value)}
                  placeholder={t.classroom.lesson_name_placeholder}
                  className="bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50"
                />
              </div>

              {/* Language & Bible Version selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t.setup.language}
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setLessonLang('es')}
                      variant={lessonLang === 'es' ? 'default' : 'outline'}
                      className={`flex-grow border-slate-800 ${lessonLang === 'es' ? 'bg-amber-500 text-slate-950 hover:bg-amber-600 font-bold' : 'text-slate-400'}`}
                      size="sm"
                    >
                      Español
                    </Button>
                    <Button
                      onClick={() => setLessonLang('en')}
                      variant={lessonLang === 'en' ? 'default' : 'outline'}
                      className={`flex-grow border-slate-800 ${lessonLang === 'en' ? 'bg-amber-500 text-slate-950 hover:bg-amber-600 font-bold' : 'text-slate-400'}`}
                      size="sm"
                    >
                      English
                    </Button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t.setup.bible_version}
                  </Label>
                  <div className="flex flex-col gap-2">
                    {lessonLang === 'es' ? (
                      <>
                        <Button
                          onClick={() => setLessonVersion('rvr1960')}
                          variant={lessonVersion === 'rvr1960' ? 'default' : 'outline'}
                          className={`justify-start border-slate-800 text-left px-3 py-2.5 h-auto text-xs ${lessonVersion === 'rvr1960' ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600' : 'text-slate-400'}`}
                          size="sm"
                        >
                          Reina-Valera 1960 (No requiere Internet)
                        </Button>
                        <Button
                          onClick={() => setLessonVersion('nvi')}
                          variant={lessonVersion === 'nvi' ? 'default' : 'outline'}
                          className={`justify-start border-slate-800 text-left px-3 py-2.5 h-auto text-xs ${lessonVersion === 'nvi' ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600' : 'text-slate-400'}`}
                          size="sm"
                        >
                          Nueva Versión Internacional (No requiere Internet)
                        </Button>
                        <Button
                          onClick={() => setLessonVersion('ntv')}
                          variant={lessonVersion === 'ntv' ? 'default' : 'outline'}
                          className={`justify-start border-slate-800 text-left px-3 py-2.5 h-auto text-xs ${lessonVersion === 'ntv' ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600' : 'text-slate-400'}`}
                          size="sm"
                        >
                          Nueva Traducción Viviente (No requiere Internet)
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => setLessonVersion('kjv')}
                          variant={lessonVersion === 'kjv' ? 'default' : 'outline'}
                          className={`justify-start border-slate-800 text-left px-3 py-2.5 h-auto text-xs ${lessonVersion === 'kjv' ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600' : 'text-slate-400'}`}
                          size="sm"
                        >
                          King James Version (No Internet required)
                        </Button>
                        <Button
                          onClick={() => setLessonVersion('niv')}
                          variant={lessonVersion === 'niv' ? 'default' : 'outline'}
                          className={`justify-start border-slate-800 text-left px-3 py-2.5 h-auto text-xs ${lessonVersion === 'niv' ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600' : 'text-slate-400'}`}
                          size="sm"
                        >
                          New International Version (No Internet required)
                        </Button>
                        <Button
                          onClick={() => setLessonVersion('esv')}
                          variant={lessonVersion === 'esv' ? 'default' : 'outline'}
                          className={`justify-start border-slate-800 text-left px-3 py-2.5 h-auto text-xs ${lessonVersion === 'esv' ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600' : 'text-slate-400'}`}
                          size="sm"
                        >
                          English Standard Version (No Internet required)
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Game Mode */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.setup.mode_title}
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={() => setLessonMode('find-word')}
                    variant={lessonMode === 'find-word' ? 'default' : 'outline'}
                    className={`flex-grow border-slate-800 text-xs ${lessonMode === 'find-word' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                    size="sm"
                  >
                    {t.setup.mode_find_word}
                  </Button>
                  <Button
                    onClick={() => setLessonMode('complete-phrase')}
                    variant={lessonMode === 'complete-phrase' ? 'default' : 'outline'}
                    className={`flex-grow border-slate-800 text-xs ${lessonMode === 'complete-phrase' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                    size="sm"
                  >
                    {t.setup.mode_complete_phrase}
                  </Button>
                  <Button
                    onClick={() => setLessonMode('guess-the-phrase')}
                    variant={lessonMode === 'guess-the-phrase' ? 'default' : 'outline'}
                    className={`flex-grow border-slate-800 text-xs ${lessonMode === 'guess-the-phrase' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                    size="sm"
                  >
                    {t.setup.mode_guess_phrase}
                  </Button>
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  {t.classroom.select_level}
                </Label>
                <RadioGroup defaultValue={lessonDifficulty} onValueChange={setLessonDifficulty as any} className="grid grid-cols-3 gap-3">
                  <div>
                      <RadioGroupItem value="principiante" id="p_diff" className="sr-only" />
                      <Label htmlFor="p_diff" className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 min-h-[60px] cursor-pointer text-center text-xs transition-all duration-300 ${lessonDifficulty === 'principiante' ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold' : 'border-slate-800 bg-slate-950/40 text-slate-400'}`}>
                          {t.setup.diff_beginner}
                      </Label>
                  </div>
                  <div>
                      <RadioGroupItem value="discipulo" id="d_diff" className="sr-only" />
                      <Label htmlFor="d_diff" className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 min-h-[60px] cursor-pointer text-center text-xs transition-all duration-300 ${lessonDifficulty === 'discipulo' ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold' : 'border-slate-800 bg-slate-950/40 text-slate-400'}`}>
                          {t.setup.diff_disciple}
                      </Label>
                  </div>
                  <div>
                      <RadioGroupItem value="avanzado" id="e_diff" className="sr-only" />
                      <Label htmlFor="e_diff" className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 min-h-[60px] cursor-pointer text-center text-xs transition-all duration-300 ${lessonDifficulty === 'avanzado' ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold' : 'border-slate-800 bg-slate-950/40 text-slate-400'}`}>
                          {t.setup.diff_expert}
                      </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Reflection Question */}
              <div className="space-y-1.5">
                <Label htmlFor="reflection-question" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.classroom.reflection_question}
                </Label>
                <Input
                  id="reflection-question"
                  value={reflectionQuestion}
                  onChange={(e) => setReflectionQuestion(e.target.value)}
                  placeholder={t.classroom.reflection_placeholder}
                  className="bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50"
                />
              </div>
            </div>

            {/* Challenges Selector (Limit to 5) */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex justify-between items-center">
                <span>{t.classroom.select_challenges}</span>
                <span className="text-amber-400 font-mono">({selectedChallenges.length}/5)</span>
              </Label>
              <div className="max-h-52 overflow-y-auto border border-slate-800 rounded-2xl bg-slate-950/80 p-2 space-y-1.5 pr-2">
                {availableChallenges.map((item: any, idx: number) => {
                  const labelText = item.fullPhrase || item.phrase || item.answer;
                  const reference = item.reference ? ` (${item.reference})` : '';
                  const isSelected = selectedChallenges.some(
                    c => (c.answer && c.answer === item.answer) || 
                         (c.fullPhrase && c.fullPhrase === item.fullPhrase) || 
                         (c.phrase && c.phrase === item.phrase)
                  );

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleChallengeSelection(item)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${isSelected ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'}`}
                    >
                      <span className="truncate max-w-[85%]">{labelText}{reference}</span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-600 shrink-0 ml-2 hover:text-slate-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={generateLessonLink}
              size="lg"
              className="w-full font-bold text-slate-950 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 rounded-2xl py-6"
            >
              {t.classroom.generate_link}
            </Button>

            {/* Generated Share Drawer */}
            {generatedUrl && (
              <div className="space-y-3 p-4 bg-slate-950 border border-slate-800 rounded-2xl animate-fade-in">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  {t.classroom.link_generated}
                </h4>
                
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={generatedUrl}
                    className="bg-slate-900 border-slate-800 text-slate-400 text-xs select-all"
                  />
                  <Button onClick={handleCopy} size="icon" variant="outline" className="border-slate-800 text-slate-400 hover:text-white shrink-0">
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <Button
                  onClick={handleShareWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 py-4"
                >
                  <Share2 className="w-4 h-4" />
                  {t.classroom.share_whatsapp}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

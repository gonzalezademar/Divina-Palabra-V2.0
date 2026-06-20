"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { InstitutionalLogo } from '@/components/common/InstitutionalLogo';
import { useGame } from '@/contexts/GameContext';
import { Crown, School, Sparkles, Globe, ArrowRight, HelpCircle, BookOpen, Settings, ChevronLeft, ChevronRight, Trophy, Share2 } from 'lucide-react';
import { dailyVerses } from '@/data/bibleMetadata';


export default function WelcomePage() {
  const router = useRouter();
  const { 
    playSound, 
    language, 
    setLanguage, 
    t, 
    hasConfiguredLanguage
  } = useGame();

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingSlide, setOnboardingSlide] = useState(0);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const [dailyVerse, setDailyVerse] = useState(dailyVerses[0]);

  useEffect(() => {
    const day = new Date().getDate();
    const idx = day % dailyVerses.length;
    setDailyVerse(dailyVerses[idx]);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem('divina_palabra_onboarding_completed');
      if (!completed && hasConfiguredLanguage) {
        setShowOnboarding(true);
      }
    }
  }, [hasConfiguredLanguage]);

  const handleStartOnboarding = () => {
    playSound('click');
    setOnboardingSlide(0);
    setShowOnboarding(true);
  };

  const handleCloseOnboarding = () => {
    playSound('click');
    localStorage.setItem('divina_palabra_onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  const handleNextOnboarding = () => {
    if (onboardingSlide < 2) {
      playSound('click');
      setOnboardingSlide(prev => prev + 1);
    } else {
      handleCloseOnboarding();
    }
  };

  const handlePrevOnboarding = () => {
    playSound('click');
    if (onboardingSlide > 0) {
      setOnboardingSlide(prev => prev - 1);
    }
  };

  // 1. Language Setup Screen (First-time users)
  if (!hasConfiguredLanguage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <main className="flex flex-col items-center justify-center text-center w-full max-w-md animate-fade-in z-10">
          <Card className="w-full bg-slate-900/80 backdrop-blur-md border-amber-500/25 shadow-2xl shadow-amber-500/5 rounded-3xl overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />
            <CardHeader className="pt-8 pb-4 text-center flex flex-col items-center">
              <InstitutionalLogo className="w-24 h-24 mb-4" />
              <CardTitle className="font-headline text-4xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-yellow-400 to-amber-600 drop-shadow-md">
                Divina Palabra
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm mt-2">
                Selecciona tu idioma para comenzar / Select your language to start
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <Button 
                onClick={() => { playSound('click'); setLanguage('es'); }} 
                className="w-full font-bold text-lg py-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-600 hover:to-yellow-600 rounded-2xl flex items-center justify-center gap-2"
              >
                Español <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                onClick={() => { playSound('click'); setLanguage('en'); }} 
                variant="outline"
                className="w-full font-bold text-lg py-6 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white rounded-2xl flex items-center justify-center gap-2"
              >
                English <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // 2. Onboarding Modal Overlay
  if (showOnboarding) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950/95 text-slate-100 p-4 fixed inset-0 z-50 overflow-hidden backdrop-blur-sm">
        <main className="w-full max-w-lg animate-fade-in z-10">
          <Card className="w-full bg-slate-900 border-amber-500/30 shadow-2xl rounded-3xl overflow-hidden relative">
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />
            
            <div className="absolute top-4 right-4">
              <Button 
                onClick={handleCloseOnboarding} 
                variant="ghost" 
                size="sm" 
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                {t.onboarding.skip}
              </Button>
            </div>

            <CardContent className="p-8 space-y-6 flex flex-col items-center text-center">
              {/* CSS Gameplay Illustration */}
              <div className="w-full flex justify-center py-2">
                {onboardingSlide === 0 && (
                  <div className="relative w-36 h-36 flex items-center justify-center bg-slate-950/80 rounded-full border border-slate-800 shadow-inner">
                    <div className="absolute w-24 h-24 rounded-full border border-amber-500/20 bg-amber-500/5 animate-pulse" />
                    <div className="absolute w-12 h-12 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-lg shadow-lg">A</div>
                    {/* Letters ring mock */}
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                      const angle = (i * 360) / 6;
                      const rad = (angle * Math.PI) / 180;
                      const x = 50 + 38 * Math.cos(rad);
                      const y = 50 + 38 * Math.sin(rad);
                      return (
                        <span key={i} className="absolute w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-[9px] font-bold flex items-center justify-center text-slate-400" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
                          {['B', 'C', 'D', 'E', 'F', 'G'][i]}
                        </span>
                      );
                    })}
                  </div>
                )}
                {onboardingSlide === 1 && (
                  <div className="relative w-44 h-32 flex flex-col justify-center bg-slate-950/80 rounded-2xl border border-slate-800 p-3 space-y-2">
                    {/* Scrambled word simulator */}
                    <div className="flex justify-center gap-1">
                      {['B', 'I', 'B', 'L', 'I', 'A'].map((l, i) => (
                        <span key={i} className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold flex items-center justify-center text-xs animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                          {['I', 'B', 'B', 'L', 'I', 'A'][i]}
                        </span>
                      ))}
                    </div>
                    <div className="w-full bg-slate-900 h-6 rounded-lg border border-slate-800 flex items-center px-2 text-[10px] text-slate-450 justify-center">
                      {language === 'es' ? 'Tu respuesta: BIBLIA' : 'Your answer: BIBLE'}
                    </div>
                  </div>
                )}
                {onboardingSlide === 2 && (
                  <div className="relative w-44 h-32 flex flex-col justify-between bg-slate-950/80 rounded-2xl border border-slate-800 p-3">
                    <div className="flex gap-2 items-center">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center font-bold text-sm shrink-0">
                        <School className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5 text-left">
                        <div className="w-20 bg-slate-800 h-2.5 rounded" />
                        <div className="w-24 bg-slate-800/60 h-2 rounded" />
                      </div>
                    </div>
                    <div className="w-full bg-green-650 text-white rounded-lg py-1.5 text-[10px] font-bold flex items-center justify-center gap-1 shadow-md">
                      <Share2 className="w-3 h-3" />
                      {language === 'es' ? 'Compartir por WhatsApp' : 'Share via WhatsApp'}
                    </div>
                  </div>
                )}
              </div>

              {/* Slide Content */}
              <div className="space-y-3">
                <h3 className="font-headline text-2xl font-bold text-amber-300">
                  {onboardingSlide === 0 && t.onboarding.slide1_title}
                  {onboardingSlide === 1 && t.onboarding.slide2_title}
                  {onboardingSlide === 2 && t.onboarding.slide3_title}
                </h3>
                <p className="text-slate-350 text-sm leading-relaxed max-w-md mx-auto">
                  {onboardingSlide === 0 && t.onboarding.slide1_desc}
                  {onboardingSlide === 1 && t.onboarding.slide2_desc}
                  {onboardingSlide === 2 && t.onboarding.slide3_desc}
                </p>
              </div>

              {/* Navigation Indicators */}
              <div className="flex gap-1.5 pt-4">
                {[0, 1, 2].map((idx) => (
                  <div 
                    key={idx} 
                    className={`h-2 rounded-full transition-all duration-300 ${onboardingSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700'}`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center w-full pt-4 border-t border-slate-800/80">
                <Button 
                  onClick={handlePrevOnboarding} 
                  disabled={onboardingSlide === 0}
                  variant="ghost" 
                  className={`text-slate-400 hover:text-white flex items-center gap-1 ${onboardingSlide === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t.onboarding.prev}
                </Button>
                
                <Button 
                  onClick={handleNextOnboarding} 
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-5 rounded-xl flex items-center gap-1"
                >
                  {onboardingSlide === 2 ? t.onboarding.start : t.onboarding.next}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // 3. Main Welcome Dashboard
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating help / language buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <Button 
          onClick={handleStartOnboarding} 
          variant="ghost" 
          size="icon" 
          className="text-slate-400 hover:text-white bg-slate-900/40 border border-slate-850 hover:bg-slate-800 rounded-xl"
          title={language === 'es' ? 'Ver guía de inducción' : 'View onboarding guide'}
        >
          <HelpCircle className="w-5 h-5 text-amber-400" />
        </Button>
        <Button 
          onClick={() => { playSound('click'); setLanguage(language === 'es' ? 'en' : 'es'); }} 
          variant="ghost" 
          size="icon" 
          className="text-slate-400 hover:text-white bg-slate-900/40 border border-slate-850 hover:bg-slate-800 rounded-xl"
          title={language === 'es' ? 'Change language to English' : 'Cambiar idioma a Español'}
        >
          <Globe className="w-5 h-5 text-sky-400" />
        </Button>
      </div>

      <main className="flex flex-col items-center justify-center text-center w-full max-w-4xl animate-fade-in z-10 mt-12 mb-8">
        <Card className="w-full bg-slate-900/80 backdrop-blur-md border-primary/30 shadow-2xl shadow-primary/5 rounded-3xl overflow-hidden relative p-4 md:p-6">
          {/* Top golden border ribbon */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 absolute top-0 left-0 right-0" />
          
          <CardHeader className="pt-8 pb-4 text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <InstitutionalLogo className="w-20 h-20" />
            </div>
            
            <CardTitle className="font-headline text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-yellow-400 to-amber-600 drop-shadow-md">
              {t.welcome.title}
            </CardTitle>
            <CardDescription className="text-sky-300 text-sm md:text-base font-semibold tracking-wide uppercase mt-1">
              {t.welcome.subtitle}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8 p-2 md:p-4">
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              {t.welcome.purpose_content}
            </p>

            {/* Daily Verse Section */}
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-slate-950 border border-amber-500/20 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <p className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'es' ? 'Versículo del Día' : 'Verse of the Day'}
              </p>
              <blockquote className="text-slate-100 text-base md:text-lg italic font-serif leading-relaxed px-4">
                "{language === 'es' ? dailyVerse.textEs : dailyVerse.textEn}"
              </blockquote>
              <cite className="text-amber-500/80 font-bold text-xs md:text-sm font-sans block not-italic">
                — {language === 'es' ? dailyVerse.referenceEs : dailyVerse.referenceEn}
              </cite>
            </div>

            {/* Exploration Paths Section */}
            <div className="space-y-4 text-left">
              <h3 className="text-base font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/60 pb-2 flex items-center gap-2">
                {language === 'es' ? 'Explorar Secciones' : 'Explore Sections'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Path 1: Dinámicas Bíblicas (Retos) */}
                <div 
                  onClick={() => { playSound('click'); router.push('/setup'); }}
                  className="bg-slate-950/60 border border-slate-850 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:bg-slate-950/80 group shadow-md"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-400 group-hover:bg-amber-500/20 group-hover:text-amber-300 transition-colors">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-100 text-sm group-hover:text-amber-300 transition-colors">
                      {language === 'es' ? 'Dinámicas Bíblicas' : 'Biblical Dynamics'}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {language === 'es' 
                        ? 'Participa en desafíos interactivos y actividades didácticas diseñadas para edificar tu fe.' 
                        : 'Participate in interactive challenges and educational activities designed to build your faith.'}
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button size="sm" className="bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-slate-950 text-xs font-bold rounded-xl gap-1">
                      {language === 'es' ? 'Entrar' : 'Enter'}
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Path 2: Estudio Bíblico (Biblia) */}
                <div 
                  onClick={() => { playSound('click'); router.push('/bible'); }}
                  className="bg-slate-950/60 border border-slate-850 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:bg-slate-950/80 group shadow-md"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20 text-sky-400 group-hover:bg-sky-500/20 group-hover:text-sky-300 transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-100 text-sm group-hover:text-sky-300 transition-colors">
                      {language === 'es' ? 'Estudio y Bosquejos' : 'Study & Outlines'}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {language === 'es' 
                        ? 'Explora las Escrituras de forma interactiva y prepara bosquejos estructurados para tus sermones.' 
                        : 'Explore Scriptures interactively and prepare structured outlines for your sermons.'}
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button size="sm" className="bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-slate-950 text-xs font-bold rounded-xl gap-1">
                      {language === 'es' ? 'Entrar' : 'Enter'}
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Path 3: Escuela Dominical (Aulas) */}
                <div 
                  onClick={() => { playSound('click'); router.push('/teacher'); }}
                  className="bg-slate-950/60 border border-slate-850 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:bg-slate-950/80 group shadow-md"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20 text-green-400 group-hover:bg-green-500/20 group-hover:text-green-300 transition-colors">
                      <School className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-100 text-sm group-hover:text-green-300 transition-colors">
                      {language === 'es' ? 'Área del Educador' : 'Educator Area'}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {language === 'es' 
                        ? 'Crea lecciones a medida y tareas personalizadas para compartirlas por WhatsApp con tus alumnos.' 
                        : 'Create tailor-made lessons and custom assignments to share via WhatsApp with your students.'}
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button size="sm" className="bg-green-500/10 text-green-400 border border-green-500/20 group-hover:bg-green-500 group-hover:text-slate-950 text-xs font-bold rounded-xl gap-1">
                      {language === 'es' ? 'Entrar' : 'Enter'}
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 mt-6">
              <p className="text-slate-500 text-[10px] md:text-xs text-center max-w-lg">
                {t.welcome.disclaimer}
              </p>
              <button 
                onClick={() => { playSound('click'); setShowPrivacyPolicy(true); }}
                className="text-amber-500/70 hover:text-amber-400 text-xs underline font-semibold transition-colors mt-1"
              >
                {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
              </button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950/95 text-slate-100 p-4 fixed inset-0 z-50 overflow-hidden backdrop-blur-sm">
          <main className="w-full max-w-lg animate-fade-in z-10 p-2">
            <Card className="w-full bg-slate-900 border-amber-500/30 shadow-2xl rounded-3xl overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />
              <CardHeader className="pt-6 pb-2 text-center">
                <CardTitle className="font-headline text-2xl text-amber-300">
                  {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-xs md:text-sm text-slate-350 max-h-96 overflow-y-auto leading-relaxed text-left">
                {language === 'es' ? (
                  <>
                    <p className="font-bold text-amber-400">1. Compromiso con la Familia y la Fe</p>
                    <p>Divina Palabra ha sido creada con el único propósito de edificar el conocimiento bíblico de manera saludable, segura y constructiva para niños, jóvenes y adultos.</p>
                    <p className="font-bold text-amber-400">2. Procesamiento Local y Privacidad Total</p>
                    <p>No recopilamos, almacenamos ni compartimos ninguna información personal. Todos los nombres de equipos, configuraciones y puntajes se guardan exclusivamente en el almacenamiento local de su dispositivo y nunca se transmiten a servidores externos.</p>
                    <p className="font-bold text-amber-400">3. Sin Rastreadores ni Anuncios Invasivos</p>
                    <p>La aplicación no utiliza tecnologías de geolocalización o rastreo de comportamiento. En su versión gratuita, los anuncios se sirven de manera respetuosa sin interrumpir la experiencia de aprendizaje bíblico.</p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-amber-400">1. Commitment to Family and Faith</p>
                    <p>Divina Palabra was created with the sole purpose of building biblical knowledge in a healthy, safe, and constructive way for children, youth, and adults.</p>
                    <p className="font-bold text-amber-400">2. Local Processing and Complete Privacy</p>
                    <p>We do not collect, store, or share any personal information. All team names, configurations, and scores are saved exclusively in the local storage of your device and are never transmitted to external servers.</p>
                    <p className="font-bold text-amber-400">3. No Trackers or Invasive Ads</p>
                    <p>The application does not use geolocation or behavioral tracking technologies. In its free version, ads are served respectfully without interrupting the biblical learning experience.</p>
                  </>
                )}
              </CardContent>
              <CardFooter className="p-4 border-t border-slate-800 flex justify-end">
                <Button onClick={() => { playSound('click'); setShowPrivacyPolicy(false); }} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 rounded-xl">
                  {language === 'es' ? 'Cerrar' : 'Close'}
                </Button>
              </CardFooter>
            </Card>
          </main>
        </div>
      )}
    </div>
  );
}

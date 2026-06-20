"use client";

import { useGame } from '@/contexts/GameContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InstitutionalLogo } from '@/components/common/InstitutionalLogo';
import { ArrowLeft, BookOpen, Globe, Mail, Shield, Sparkles, Heart } from 'lucide-react';

const APP_VERSION = '2.0.0';
const BUILD_DATE = 'Junio 2025';
const DEVELOPER = 'Adelio González';
const STUDIO = 'AG Lumina';
const SLOGAN = 'Tecnología que ilumina';
const CONTACT = 'contacto@aglumina.dev';

export default function AboutPage() {
  const { language, playSound } = useGame();
  const router = useRouter();

  const handleBack = () => {
    playSound('click');
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <main className="flex flex-col items-center w-full max-w-lg z-10 mt-6 mb-8">
        {/* Back button */}
        <div className="w-full mb-4">
          <Button onClick={handleBack} variant="ghost" size="sm" className="text-slate-400 hover:text-white flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            {language === 'es' ? 'Volver' : 'Back'}
          </Button>
        </div>

        <Card className="w-full bg-slate-900/80 backdrop-blur-md border-primary/30 shadow-2xl rounded-3xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />

          {/* App Identity */}
          <CardHeader className="pt-8 pb-4 text-center flex flex-col items-center">
            <InstitutionalLogo className="w-20 h-20 mb-4" />
            <CardTitle className="font-headline text-3xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-yellow-400 to-amber-600">
              Divina Palabra
            </CardTitle>
            <p className="text-sky-300 text-sm font-medium tracking-widest uppercase mt-1">
              {language === 'es' ? 'Edición Bíblica' : 'Bible Edition'}
            </p>
            <div className="flex items-center gap-2 mt-3 bg-slate-950/60 px-4 py-2 rounded-full border border-slate-800">
              <span className="text-xs text-amber-400 font-mono font-bold">v{APP_VERSION}</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">{BUILD_DATE}</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 p-6">

            {/* What's new */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'es' ? 'Novedades v2.0' : "What's new in v2.0"}
              </h3>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li>{language === 'es' ? 'Panel bíblico con buscador secuencial' : 'Bible panel with sequential search'}</li>
                <li>{language === 'es' ? 'Preparador de bosquejos de sermón' : 'Sermon outline assistant'}</li>
                <li>{language === 'es' ? 'Navegación inferior persistente' : 'Persistent bottom navigation'}</li>
                <li>{language === 'es' ? 'Sistema de pistas progresivo en actividades' : 'Progressive hint system in activities'}</li>
                <li>{language === 'es' ? 'Configuración de idioma permanente' : 'Permanent language configuration'}</li>
                <li>{language === 'es' ? 'Perfil y ajustes del usuario' : 'User profile and settings'}</li>
              </ul>
            </div>

            {/* Bible versions */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                {language === 'es' ? 'Versiones Bíblicas' : 'Bible Versions'}
              </h3>
              <div className="grid grid-cols-2 gap-1.5">
                {['Reina-Valera 1960', 'Nueva Versión Internacional', 'King James Version', 'New Int\'l Version', 'Engl. Standard Version', 'Nueva Trad. Viviente'].map((v) => (
                  <span key={v} className="text-[11px] text-slate-400 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-center">{v}</span>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 italic mt-1">
                {language === 'es' 
                  ? 'Los textos bíblicos son propiedad de sus respectivos titulares de derechos.'
                  : 'Bible texts are property of their respective copyright holders.'}
              </p>
            </div>

            {/* Developer / Studio */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                {language === 'es' ? 'Desarrollado por' : 'Developed by'}
              </h3>

              <div className="flex items-center gap-3">
                {/* AG Lumina mini-badge */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <span className="text-amber-400 font-bold text-sm font-mono">AG</span>
                </div>
                <div>
                  <p className="font-bold text-amber-300 text-sm">{STUDIO}</p>
                  <p className="text-slate-400 text-xs">{DEVELOPER}</p>
                  <p className="text-slate-500 text-[10px] italic">"{SLOGAN}"</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs text-slate-500">{CONTACT}</span>
              </div>
            </div>

            {/* Privacy & Legal */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                {language === 'es' ? 'Legal' : 'Legal'}
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {language === 'es'
                  ? 'Esta aplicación no recopila datos personales del usuario. El historial de actividades y configuraciones se almacena únicamente en el dispositivo del usuario.'
                  : 'This application does not collect personal user data. Activity history and settings are stored only on the user\'s device.'}
              </p>
            </div>

            {/* Copyright footer */}
            <div className="text-center pt-2 space-y-1">
              <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                {language === 'es' ? 'Hecho con' : 'Made with'} <Heart className="w-3 h-3 text-red-400 fill-current" /> {language === 'es' ? 'por' : 'by'} {DEVELOPER}
              </p>
              <p className="text-[11px] text-slate-600 font-mono">
                © 2025 {STUDIO} · Todos los derechos reservados
              </p>
              <p className="text-[10px] text-slate-700 font-mono">
                Divina Palabra v{APP_VERSION} · Build 2025.06
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

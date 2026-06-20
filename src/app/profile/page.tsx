"use client";

import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InstitutionalLogo } from '@/components/common/InstitutionalLogo';
import { Globe, Volume2, VolumeX, Crown, Shield, User, Check, Info } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { 
    language, 
    setLanguage, 
    isSoundOn, 
    toggleSound, 
    isPremium, 
    setIsPremium, 
    teams, 
    setTeams, 
    playSound,
    t 
  } = useGame();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const router = useRouter();

  const handleTeamNameChange = (index: number, name: string) => {
    const newTeams = [...teams];
    if (newTeams[index]) {
      newTeams[index].name = name;
      setTeams(newTeams);
    }
  };

  const handleSaveSettings = () => {
    playSound('correct');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <main className="flex flex-col items-center justify-center w-full max-w-2xl animate-fade-in z-10 mt-6 mb-8">
        <Card className="w-full bg-slate-900/80 backdrop-blur-md border-primary/30 shadow-2xl rounded-3xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />
          
          <CardHeader className="pt-6 pb-2 text-center">
            <div className="flex justify-center items-center gap-3 mb-2">
              <InstitutionalLogo className="w-14 h-14" />
              <div className="text-left">
                <CardTitle className="font-headline text-2xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-yellow-500 flex items-center gap-1.5">
                  <User className="w-6 h-6 text-amber-400" />
                  {language === 'es' ? 'Mi Perfil y Ajustes' : 'My Profile & Settings'}
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs mt-0.5">
                  {language === 'es' ? 'Configuración personal e idioma de la aplicación' : 'Personal settings and application language'}
                </CardDescription>
              </div>
            </div>
            <div className="border-b border-slate-800 w-3/4 mx-auto my-2" />
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            {/* 1. Language Configuration */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-400" />
                {language === 'es' ? 'Idioma del Sistema (Fijo)' : 'System Language (Fixed)'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'es' 
                  ? 'Configura el idioma predeterminado de la aplicación. Se mantendrá guardado permanentemente.'
                  : 'Configure the default language of the application. It will be permanently saved.'}
              </p>
              <div className="flex gap-3 mt-2">
                <Button
                  onClick={() => { playSound('click'); setLanguage('es'); }}
                  variant={language === 'es' ? 'default' : 'outline'}
                  className={`flex-grow py-5 font-bold ${language === 'es' ? 'bg-amber-500 text-slate-950 hover:bg-amber-600' : 'border-slate-800 text-slate-400'}`}
                >
                  Español
                </Button>
                <Button
                  onClick={() => { playSound('click'); setLanguage('en'); }}
                  variant={language === 'en' ? 'default' : 'outline'}
                  className={`flex-grow py-5 font-bold ${language === 'en' ? 'bg-amber-500 text-slate-950 hover:bg-amber-600' : 'border-slate-800 text-slate-400'}`}
                >
                  English
                </Button>
              </div>
            </div>

            {/* 2. Sound Configuration */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                {isSoundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                {language === 'es' ? 'Efectos de Sonido' : 'Sound Effects'}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {language === 'es' ? 'Activar o desactivar las alertas sonoras' : 'Enable or disable audio alerts'}
                </span>
                <Button
                  onClick={toggleSound}
                  variant={isSoundOn ? 'default' : 'outline'}
                  className={isSoundOn ? 'bg-amber-500 text-slate-950 hover:bg-amber-600' : 'border-slate-800 text-slate-400'}
                  size="sm"
                >
                  {isSoundOn ? (language === 'es' ? 'Encendido' : 'On') : (language === 'es' ? 'Apagado' : 'Off')}
                </Button>
              </div>
            </div>

            {/* 3. Default Team Settings */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                {language === 'es' ? 'Nombres de Equipos por Defecto' : 'Default Team Names'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teams.map((team, index) => (
                  <div key={index} className="flex flex-col gap-1.5">
                    <Label htmlFor={`team-name-${index}`} className="text-xs text-slate-400">
                      {language === 'es' ? `Nombre del Equipo ${index + 1}` : `Team ${index + 1} Name`}
                    </Label>
                    <Input
                      id={`team-name-${index}`}
                      value={team.name}
                      onChange={(e) => handleTeamNameChange(index, e.target.value)}
                      className="bg-slate-900 border-slate-800 text-slate-200 text-sm focus:border-amber-500/50"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Subscription Simulator */}
            <div className="border border-amber-500/20 bg-amber-500/5 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-400 fill-current" />
                  Divina Palabra Premium
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isPremium 
                    ? (language === 'es' ? '¡Suscripción Activa! Anuncios eliminados.' : 'Active Subscription! Ads removed.')
                    : (language === 'es' ? 'Compra simulada para remover anuncios ($1.99 USD).' : 'Simulated purchase to remove ads ($1.99 USD).')
                  }
                </p>
              </div>
              <Button 
                onClick={() => {
                  playSound('correct');
                  setIsPremium(!isPremium);
                }} 
                size="sm" 
                variant={isPremium ? "outline" : "default"} 
                className={isPremium ? "border-amber-500/30 text-amber-400" : "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"}
              >
                {isPremium 
                  ? (language === 'es' ? 'Desactivar Premium' : 'Deactivate Premium') 
                  : (language === 'es' ? 'Comprar por $1,99' : 'Buy for $1.99')
                }
              </Button>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-950/40 p-4 border-t border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-between w-full">
              <Button
                onClick={() => { playSound('click'); router.push('/about'); }}
                variant="ghost"
                size="sm"
                className="text-slate-500 hover:text-slate-300 flex items-center gap-1.5 text-xs"
              >
                <Info className="w-3.5 h-3.5" />
                {language === 'es' ? 'Acerca de la app' : 'About this app'}
              </Button>
              <Button 
                onClick={handleSaveSettings} 
                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-600 hover:to-yellow-600 font-bold rounded-xl px-6 flex items-center gap-2"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    {language === 'es' ? 'Guardado' : 'Saved'}
                  </>
                ) : (
                  language === 'es' ? 'Guardar Cambios' : 'Save Changes'
                )}
              </Button>
            </div>
            <p className="text-[10px] text-slate-700 font-mono text-center w-full">
              Divina Palabra v2.0.0 · AG Lumina · 2025
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

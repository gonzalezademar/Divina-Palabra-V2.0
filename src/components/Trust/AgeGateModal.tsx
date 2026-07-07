"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { InstitutionalLogo } from '@/components/common/InstitutionalLogo';

interface AgeGateModalProps {
  onVerify: () => void;
}

export function AgeGateModal({ onVerify }: AgeGateModalProps) {
  const { language, playSound, setUserSettings } = useGame();
  
  const handleVerify = (isAdult: boolean) => {
    playSound('click');
    setUserSettings({ ageVerified: true, isAdult });
    onVerify();
  };

  const isEs = language === 'es';

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-slate-950/95 text-slate-100 p-4 fixed inset-0 z-50 overflow-hidden backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-desc"
    >
      <main className="w-full max-w-md animate-fade-in z-10">
        <Card className="w-full bg-slate-900 border-amber-500/30 shadow-2xl rounded-3xl overflow-hidden relative">
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />
          <CardHeader className="pt-8 pb-4 text-center flex flex-col items-center">
            <InstitutionalLogo className="w-16 h-16 mb-2" />
            <CardTitle id="age-gate-title" className="font-headline text-2xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-yellow-400 to-amber-600">
              {isEs ? 'Verificación de Edad' : 'Age Verification'}
            </CardTitle>
            <CardDescription id="age-gate-desc" className="text-slate-400 text-sm mt-2">
              {isEs 
                ? 'Para garantizar una experiencia segura, por favor indica tu edad.' 
                : 'To ensure a safe experience, please indicate your age.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <Button 
              onClick={() => handleVerify(true)} 
              className="w-full font-bold py-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-600 hover:to-yellow-600 rounded-2xl"
            >
              {isEs ? 'Tengo 13 años o más' : 'I am 13 years or older'}
            </Button>
            <Button 
              onClick={() => handleVerify(false)} 
              variant="outline"
              className="w-full font-bold py-6 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white rounded-2xl"
            >
              {isEs ? 'Soy menor de 13 años' : 'I am under 13 years old'}
            </Button>
          </CardContent>
          <CardFooter className="p-4 border-t border-slate-800/80 text-center flex justify-center">
             <p className="text-slate-500 text-[10px]">
               {isEs 
                 ? 'No guardamos datos personales. Esta opción ajusta la privacidad del juego.' 
                 : 'We do not store personal data. This option adjusts game privacy.'}
             </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

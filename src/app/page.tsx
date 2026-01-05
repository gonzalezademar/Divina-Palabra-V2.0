"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { InstitutionalLogo } from '@/components/common/InstitutionalLogo';
import { useGame } from '@/contexts/GameContext';

export default function WelcomePage() {
  const router = useRouter();
  const { playSound } = useGame();

  const handleStart = () => {
    playSound('click');
    router.push('/setup');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <main className="flex flex-col items-center justify-center text-center w-full max-w-2xl animate-fade-in">
        <Card className="w-full bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl shadow-primary/10">
          <CardHeader className="pt-6 pb-4 text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <InstitutionalLogo className="w-20 h-20" />
              <div className="text-left">
                <p className="font-bold text-accent-foreground/90 text-lg">Fundación Anawin</p>
                <p className="text-sm text-muted-foreground">“Ayudando a SER y a CRECER”</p>
              </div>
            </div>
            <CardTitle className="font-headline text-5xl text-primary">Divina Palabra</CardTitle>
            <CardDescription className="text-muted-foreground text-lg">Edición Bíblica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <p className="text-foreground/90 text-base md:text-lg">
              Una experiencia interactiva para poner a prueba y expandir tu conocimiento de las Escrituras. Desafía a tus amigos, aprende en comunidad y diviértete mientras exploras la riqueza de la Biblia.
            </p>

            <Accordion type="single" collapsible className="w-full text-left">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-headline text-accent-foreground/80 text-lg justify-center">Conocer más sobre nuestro propósito</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pt-2">
                  "Divina Palabra" es más que un juego; es una herramienta de formación diseñada para fortalecer la comunidad y el estudio bíblico. Creemos que el aprendizaje puede ser una experiencia emocionante y colaborativa. Nuestra misión es ofrecer un recurso que sirva a familias, iglesias, escuelas y fundaciones para conectar a las personas con la sabiduría de las Escrituras de una manera dinámica, moderna y accesible para todas las edades.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Button onClick={handleStart} size="lg" className="w-full font-bold text-xl py-7 mt-4">
              Comenzar
            </Button>

          </CardContent>
           <div className="p-4 bg-primary/5 rounded-b-lg">
                <p className="text-xs text-muted-foreground px-4">
                    Los textos bíblicos utilizados en el juego derivan de la Biblia Reina-Valera, revisión 1960 (RVR1960), pudiendo encontrarse adaptaciones de formato necesarias para la mecánica del juego.
                </p>
            </div>
        </Card>
      </main>
    </div>
  );
}

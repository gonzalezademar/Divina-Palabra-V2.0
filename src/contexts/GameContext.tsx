"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as Tone from 'tone';

type Team = {
  name: string;
  score: number;
};

type GameMode = 'find-word' | 'complete-phrase';

interface GameContextType {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  gameMode: GameMode | null;
  setGameMode: (mode: GameMode | null) => void;
  isPracticeMode: boolean;
  setPracticeMode: (isPractice: boolean) => void;
  isSoundOn: boolean;
  toggleSound: () => void;
  playSound: (sound: 'correct' | 'incorrect' | 'click') => void;
  updateScore: (teamIndex: number, points: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Sound setup
let synth: Tone.Synth;
let metallicSynth: Tone.MetalSynth;
let noiseSynth: Tone.NoiseSynth;

if (typeof window !== 'undefined') {
  synth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 },
  }).toDestination();

  metallicSynth = new Tone.MetalSynth({
    frequency: 200,
    envelope: { attack: 0.001, decay: 0.4, release: 0.2 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
  }).toDestination();
  
  noiseSynth = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.005, decay: 0.1, release: 0.2 },
  }).toDestination();
}


export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeamsState] = useState<Team[]>([
    { name: 'Equipo 1', score: 0 },
    { name: 'Equipo 2', score: 0 },
  ]);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [isPracticeMode, setPracticeMode] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  
  useEffect(() => {
    const savedTeams = localStorage.getItem('gameTeams');
    if (savedTeams) {
      const parsedTeams = JSON.parse(savedTeams);
      const teamsWithResetScores = parsedTeams.map((team: any) => ({ ...team, score: 0 }));
      setTeamsState(teamsWithResetScores);
    }
    const savedSound = localStorage.getItem('soundOn');
    if (savedSound) {
      setIsSoundOn(JSON.parse(savedSound));
    }
  }, []);

  const setTeams = (newTeams: Team[]) => {
    setTeamsState(newTeams);
    localStorage.setItem('gameTeams', JSON.stringify(newTeams.map(({ name }) => ({ name, score: 0 }))));
  };
  
  const toggleSound = () => {
    const newSoundState = !isSoundOn;
    setIsSoundOn(newSoundState);
    localStorage.setItem('soundOn', JSON.stringify(newSoundState));
    if (newSoundState && Tone.context.state !== 'running') {
        Tone.start();
    }
    playSound('click');
  };

  const playSound = (sound: 'correct' | 'incorrect' | 'click') => {
    if (!isSoundOn || typeof window === 'undefined') return;
    
    if (Tone.context.state !== 'running') {
        Tone.start();
    }

    const now = Tone.now();

    switch (sound) {
      case 'correct':
        metallicSynth.triggerAttackRelease('C4', '8n', now);
        break;
      case 'incorrect':
        synth.triggerAttackRelease('C3', '8n', now);
        break;
      case 'click':
        noiseSynth.triggerAttackRelease('16n', now);
        break;
    }
  };

  const updateScore = (teamIndex: number, points: number) => {
    setTeamsState(prevTeams => {
        const newTeams = [...prevTeams];
        newTeams[teamIndex].score += points;
        return newTeams;
    });
  };

  return (
    <GameContext.Provider value={{ teams, setTeams, gameMode, setGameMode, isPracticeMode, setPracticeMode, isSoundOn, toggleSound, playSound, updateScore }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

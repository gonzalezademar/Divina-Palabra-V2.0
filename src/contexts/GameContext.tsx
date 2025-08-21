
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
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Sound setup
let synth: Tone.Synth;
let amSynth: Tone.AMSynth;
let noiseSynth: Tone.NoiseSynth;

if (typeof window !== 'undefined') {
  synth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.4 },
  }).toDestination();
  
  amSynth = new Tone.AMSynth({
    harmonicity: 3,
    detune: 0,
    oscillator: {
      type: 'fatsawtooth'
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.2,
      release: 0.3
    },
    modulation: {
      type: 'square'
    },
    modulationEnvelope: {
      attack: 0.01,
      decay: 0.3,
      sustain: 0.2,
      release: 0.3
    }
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
      // Reset scores on load, keep names
      const teamsWithResetScores = parsedTeams.map((team: any) => ({ ...team, score: 0 }));
      setTeamsState(teamsWithResetScores);
    }
    const savedSound = localStorage.getItem('soundOn');
    if (savedSound) {
      setIsSoundOn(JSON.parse(savedSound));
    }
  }, []);

  const setTeams = (newTeams: Team[]) => {
    setTeamsState(newTeams.map(t => ({...t, score: 0})));
    localStorage.setItem('gameTeams', JSON.stringify(newTeams.map(({ name }) => ({ name, score: 0 }))));
  };
  
  const resetGame = () => {
    setGameMode(null);
    // Reset scores, but keep team names
    setTeamsState(prevTeams => prevTeams.map(team => ({...team, score: 0})));
  }

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
        // Melodía armónica para acierto
        amSynth.triggerAttackRelease('C4', '8n', now);
        amSynth.triggerAttackRelease('E4', '8n', now + 0.1);
        amSynth.triggerAttackRelease('G4', '8n', now + 0.2);
        amSynth.triggerAttackRelease('C5', '8n', now + 0.3);
        break;
      case 'incorrect':
        // Sonido grave y corto para error
        synth.triggerAttackRelease('A2', '8n', now);
        synth.triggerAttackRelease('A#2', '8n', now + 0.1);
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
    <GameContext.Provider value={{ teams, setTeams, gameMode, setGameMode, isPracticeMode, setPracticeMode, isSoundOn, toggleSound, playSound, updateScore, resetGame }}>
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

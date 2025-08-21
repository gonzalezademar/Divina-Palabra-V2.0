
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as Tone from 'tone';

type Team = {
  name: string;
  score: number;
  lives: number;
};

type GameMode = 'find-word' | 'complete-phrase' | 'guess-the-phrase';

interface GameContextType {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  gameMode: GameMode | null;
  setGameMode: (mode: GameMode | null) => void;
  isPracticeMode: boolean;
  setPracticeMode: (isPractice: boolean) => void;
  isSoundOn: boolean;
  toggleSound: () => void;
  playSound: (sound: 'correct' | 'incorrect' | 'click' | 'times-up' | 'tick') => void;
  updateScore: (teamIndex: number, points: number) => void;
  updateLives: (teamIndex: number, change: number) => number;
  resetGame: () => void;
  roundTime: number;
  setRoundTime: (time: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Sound setup
let synth: Tone.Synth;
let amSynth: Tone.AMSynth;
let noiseSynth: Tone.NoiseSynth;
let tickSynth: Tone.MembraneSynth;
let glassSynth: Tone.MetalSynth;


if (typeof window !== 'undefined') {
  const volume = 10;
  synth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.4 },
  }).toDestination();
  synth.volume.value = volume;
  
  amSynth = new Tone.AMSynth({
    harmonicity: 1.5,
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
  amSynth.volume.value = volume;

  noiseSynth = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.005, decay: 0.1, release: 0.2 },
  }).toDestination();
  noiseSynth.volume.value = volume;

  tickSynth = new Tone.MembraneSynth({
    pitchDecay: 0.01,
    octaves: 2,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.001, decay: 0.2, sustain: 0.01, release: 0.01 }
  }).toDestination();
  tickSynth.volume.value = -18;
  
  glassSynth = new Tone.MetalSynth({
        frequency: 440,
        envelope: { attack: 0.001, decay: 1.5, release: 0.8 },
        harmonicity: 8.5,
        modulationIndex: 20,
        resonance: 4000,
        octaves: 1.5,
      }).toDestination();
  glassSynth.volume.value = -12;
}

const INITIAL_LIVES = 5;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeamsState] = useState<Team[]>([
    { name: 'Equipo 1', score: 0, lives: INITIAL_LIVES },
    { name: 'Equipo 2', score: 0, lives: INITIAL_LIVES },
  ]);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [isPracticeMode, setPracticeMode] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [roundTime, setRoundTime] = useState(30);
  
  const resetTeamStats = (teams: Team[]) => {
    return teams.map(team => ({...team, score: 0, lives: INITIAL_LIVES}));
  }

  useEffect(() => {
    const savedTeams = localStorage.getItem('gameTeams');
    if (savedTeams) {
      const parsedTeams = JSON.parse(savedTeams);
      setTeamsState(resetTeamStats(parsedTeams));
    }
    const savedSound = localStorage.getItem('soundOn');
    if (savedSound) {
      setIsSoundOn(JSON.parse(savedSound));
    }
    const savedRoundTime = localStorage.getItem('roundTime');
    if (savedRoundTime) {
      setRoundTime(JSON.parse(savedRoundTime));
    }
  }, []);

  const handleSetRoundTime = (time: number) => {
    setRoundTime(time);
    localStorage.setItem('roundTime', JSON.stringify(time));
  };

  const setTeams = (newTeams: Team[]) => {
    const teamsWithStats = newTeams.map(t => ({...t, score: 0, lives: INITIAL_LIVES}));
    setTeamsState(teamsWithStats);
    localStorage.setItem('gameTeams', JSON.stringify(newTeams.map(({ name }) => ({ name }))));
  };
  
  const resetGame = () => {
    setGameMode(null);
    setTeamsState(prevTeams => resetTeamStats(prevTeams));
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

  const playSound = (sound: 'correct' | 'incorrect' | 'click' | 'times-up' | 'tick') => {
    if (!isSoundOn || typeof window === 'undefined') return;
    
    if (Tone.context.state !== 'running') {
        Tone.start();
    }

    try {
      const now = Tone.now();
      switch (sound) {
        case 'correct':
          amSynth.triggerAttackRelease('C4', '8n', now);
          amSynth.triggerAttackRelease('G4', '8n', now + 0.15);
          amSynth.triggerAttackRelease('C5', '8n', now + 0.3);
          break;
        case 'incorrect':
          synth.triggerAttackRelease('A2', '8n', now);
          synth.triggerAttackRelease('A#2', '8n', now + 0.1);
          break;
        case 'click':
          tickSynth.triggerAttackRelease('C7', '32n', now);
          break;
        case 'times-up':
          glassSynth.triggerAttackRelease("G5", "1n", now);
          break;
        case 'tick':
          tickSynth.triggerAttackRelease('C5', '32n', now);
          break;
      }
    } catch(e) {
        console.error("Error playing sound", e);
    }
  };

  const updateScore = (teamIndex: number, points: number) => {
    setTeamsState(prevTeams => {
        const newTeams = [...prevTeams];
        if(newTeams[teamIndex]) {
          newTeams[teamIndex].score += points;
        }
        return newTeams;
    });
  };

  const updateLives = (teamIndex: number, change: number): number => {
      let newLives = 0;
      setTeamsState(prevTeams => {
        const newTeams = [...prevTeams];
        if (newTeams[teamIndex]) {
          const currentLives = newTeams[teamIndex].lives;
          newLives = Math.max(0, currentLives + change);
          newTeams[teamIndex].lives = newLives;
        }
        return newTeams;
    });
    return newLives;
  };

  return (
    <GameContext.Provider value={{ teams, setTeams, gameMode, setGameMode, isPracticeMode, setPracticeMode, isSoundOn, toggleSound, playSound, updateScore, updateLives, resetGame, roundTime, setRoundTime: handleSetRoundTime }}>
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

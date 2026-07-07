"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { getTranslation, TranslationType } from '@/data/locales';
import { getBibleData, BibleCatalog } from '@/data/bibleData';
import { LearningProfile } from '@/services/learningEngine';

type Team = {
  name: string;
  score: number;
  lives: number;
};

type GameMode = 'find-word' | 'complete-phrase' | 'guess-the-phrase' | 'bible-rosco' | 'word-search' | 'counseling-practical';
type DifficultyLevel = 'principiante' | 'discipulo' | 'avanzado';

export interface LessonType {
  lessonName: string;
  difficulty: DifficultyLevel;
  bibleVersion: string;
  language: 'es' | 'en';
  challenges: any[];
  reflectionQuestion: string;
  doctrinalProfile?: string;
}

export type SyncStatus = 'idle' | 'syncing' | 'offline' | 'error';

export interface UserSettings {
  ageVerified: boolean;
  isAdult: boolean;
}

interface GameContextType {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  gameMode: GameMode | null;
  setGameMode: (mode: GameMode | null) => void;
  difficulty: DifficultyLevel;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  isPracticeMode: boolean;
  setPracticeMode: (isPractice: boolean) => void;
  isSoundOn: boolean;
  toggleSound: () => void;
  playSound: (sound: 'correct' | 'incorrect' | 'click' | 'times-up' | 'tick') => void;
  updateScore: (teamIndex: number, points: number) => void;
  updateLives: (teamIndex: number, change: number) => number;
  resetGame: () => void;
  restartCurrentGame: () => void;
  gameRestarted: number;
  roundTime: number;
  setRoundTime: (time: number) => void;
  
  // New States
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  bibleVersion: string;
  setBibleVersion: (version: string) => void;
  isPremium: boolean;
  setIsPremium: (premium: boolean) => void;
  t: TranslationType;
  bibleData: BibleCatalog;
  activeLesson: LessonType | null;
  setActiveLesson: (lesson: LessonType | null) => void;
  hasConfiguredLanguage: boolean;
  setHasConfiguredLanguage: (val: boolean) => void;
  userSettings: UserSettings;
  setUserSettings: (settings: UserSettings) => void;
  doctrinalProfile?: string;
  setDoctrinalProfile: (profile: string | undefined) => void;
  syncStatus: SyncStatus;
  setSyncStatus: (status: SyncStatus) => void;
  learningProfile: LearningProfile;
  setLearningProfile: React.Dispatch<React.SetStateAction<LearningProfile>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Sound setup
let polySynth: Tone.PolySynth;
let clickSynth: Tone.MembraneSynth;
let tickSynth: Tone.MembraneSynth;
let bellSynth: Tone.MetalSynth;

if (typeof window !== 'undefined') {
  const volume = -8;
  polySynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.02, decay: 0.15, sustain: 0.4, release: 0.6 },
  }).toDestination();
  polySynth.volume.value = volume;

  clickSynth = new Tone.MembraneSynth({
    pitchDecay: 0.01,
    octaves: 1.5,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.001, decay: 0.1, sustain: 0.01, release: 0.01 }
  }).toDestination();
  clickSynth.volume.value = -18;
  
  tickSynth = new Tone.MembraneSynth({
    pitchDecay: 0.005,
    octaves: 1,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.001, decay: 0.08, sustain: 0.01, release: 0.01 }
  }).toDestination();
  tickSynth.volume.value = -24;

  bellSynth = new Tone.MetalSynth({
    envelope: { attack: 0.001, decay: 2.0, release: 1.5 },
    harmonicity: 5.1,
    modulationIndex: 15,
    resonance: 3000,
    octaves: 1.2
  }).toDestination();
  bellSynth.volume.value = -14;
}

const INITIAL_LIVES = 5;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeamsState] = useState<Team[]>([
    { name: 'Equipo Ámbar', score: 0, lives: INITIAL_LIVES },
    { name: 'Equipo Celeste', score: 0, lives: INITIAL_LIVES },
  ]);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [difficulty, setDifficultyState] = useState<DifficultyLevel>('principiante');
  const [isPracticeMode, setPracticeMode] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [roundTime, setRoundTime] = useState(30);
  const [gameRestarted, setGameRestarted] = useState(0);
  
  // New States
  const [language, setLanguageState] = useState<'es' | 'en'>('es');
  const [bibleVersion, setBibleVersionState] = useState<string>('rvr1960');
  const [isPremium, setIsPremiumState] = useState<boolean>(false);
  const [activeLesson, setActiveLesson] = useState<LessonType | null>(null);
  const [hasConfiguredLanguage, setHasConfiguredLanguage] = useState<boolean>(true);
  const [userSettings, setUserSettingsState] = useState<UserSettings>({ ageVerified: false, isAdult: false });
  const [doctrinalProfile, setDoctrinalProfileState] = useState<string | undefined>(undefined);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('offline');
  const [learningProfile, setLearningProfile] = useState<LearningProfile>({
    bloomLevels: {},
    competencies: {},
    themes: {},
    books: {},
    totalChallenges: 0
  });
  const lastPlayedTimesRef = useRef<Record<string, number>>({});

  const resetTeamStats = (teams: Team[]) => {
    return teams.map(team => ({...team, score: 0, lives: INITIAL_LIVES}));
  }

  // Load configuration on mount
  useEffect(() => {
    const savedSound = localStorage.getItem('soundOn');
    if (savedSound) {
      setIsSoundOn(JSON.parse(savedSound));
    }
    const savedRoundTime = localStorage.getItem('roundTime');
    if (savedRoundTime) {
      setRoundTime(JSON.parse(savedRoundTime));
    }
    const savedDifficulty = localStorage.getItem('difficulty');
    if (savedDifficulty) {
      setDifficultyState(JSON.parse(savedDifficulty) as DifficultyLevel);
    }
    const savedLang = localStorage.getItem('language');
    let activeLang: 'es' | 'en' = 'es';
    if (savedLang) {
      activeLang = JSON.parse(savedLang) as 'es' | 'en';
      setLanguageState(activeLang);
      setHasConfiguredLanguage(true);
    } else {
      setHasConfiguredLanguage(false);
    }
    
    // Set color-themed team names by default based on selected language
    setTeamsState([
      { name: activeLang === 'es' ? 'Equipo Ámbar' : 'Amber Team', score: 0, lives: INITIAL_LIVES },
      { name: activeLang === 'es' ? 'Equipo Celeste' : 'Sky Blue Team', score: 0, lives: INITIAL_LIVES },
    ]);

    // Bible version defaults based on active configured language on reload
    const defaultVersion = activeLang === 'es' ? 'rvr1960' : 'niv';
    setBibleVersionState(defaultVersion);

    const savedPremium = localStorage.getItem('isPremium');
    if (savedPremium) {
      setIsPremiumState(JSON.parse(savedPremium));
    }

    const savedUserSettings = localStorage.getItem('userSettings');
    if (savedUserSettings) {
      try {
        const parsed = JSON.parse(savedUserSettings);
        setUserSettingsState({
          ageVerified: parsed.ageVerified ?? false,
          isAdult: parsed.isAdult ?? false
        });
      } catch (e) {
        console.error("Failed to parse user settings", e);
      }
    }

    const savedProfile = localStorage.getItem('doctrinalProfile');
    if (savedProfile) {
      setDoctrinalProfileState(savedProfile);
    }
  }, []);

  // Check URL query parameters for virtual classroom lessons
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const lessonBase64 = searchParams.get('lesson');
      if (lessonBase64) {
        try {
          const decodedJson = atob(lessonBase64);
          const lessonData = JSON.parse(decodedJson) as LessonType;
          if (lessonData && lessonData.lessonName) {
            setActiveLesson(lessonData);
            if (lessonData.language) {
              setLanguageState(lessonData.language);
            }
            if (lessonData.bibleVersion) {
              setBibleVersionState(lessonData.bibleVersion);
            }
            if (lessonData.difficulty) {
              setDifficultyState(lessonData.difficulty);
            }
            if (lessonData.doctrinalProfile) {
              setDoctrinalProfileState(lessonData.doctrinalProfile);
            }
            // For lessons, we default to single player/team or a clean setup
            setTeamsState([{ name: 'Alumno', score: 0, lives: INITIAL_LIVES }]);
            setGameMode('find-word'); // default mode to open the game
          }
        } catch (e) {
          console.error("Failed to decode base64 lesson", e);
        }
      }
    }
  }, []);

  const handleSetRoundTime = (time: number) => {
    setRoundTime(time);
    localStorage.setItem('roundTime', JSON.stringify(time));
  };
  
  const setDifficulty = (newDifficulty: DifficultyLevel) => {
    setDifficultyState(newDifficulty);
    localStorage.setItem('difficulty', JSON.stringify(newDifficulty));
  };

  const setTeams = (newTeams: Team[]) => {
    setTeamsState(newTeams);
    localStorage.setItem('gameTeams', JSON.stringify(newTeams.map(({ name }) => ({ name }))));
  };

  const setLanguage = (lang: 'es' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem('language', JSON.stringify(lang));
    setHasConfiguredLanguage(true);
    
    // Set color-themed team names dynamically based on language
    setTeamsState(current => {
      if (current.length === 2) {
        return [
          { ...current[0], name: lang === 'es' ? 'Equipo Ámbar' : 'Amber Team' },
          { ...current[1], name: lang === 'es' ? 'Equipo Celeste' : 'Sky Blue Team' }
        ];
      }
      return current;
    });

    // Set matching default bible version
    const defaultVersion = lang === 'es' ? 'rvr1960' : 'niv';
    setBibleVersionState(defaultVersion);
    localStorage.setItem('bibleVersion', JSON.stringify(defaultVersion));
  };

  const setBibleVersion = (version: string) => {
    setBibleVersionState(version);
    localStorage.setItem('bibleVersion', JSON.stringify(version));
  };

  const setIsPremium = (premium: boolean) => {
    setIsPremiumState(premium);
    localStorage.setItem('isPremium', JSON.stringify(premium));
  };
  
  const setUserSettings = (settings: UserSettings) => {
    setUserSettingsState(settings);
    localStorage.setItem('userSettings', JSON.stringify(settings));
  };
  
  const setDoctrinalProfile = (profile: string | undefined) => {
    setDoctrinalProfileState(profile);
    if (profile) {
      localStorage.setItem('doctrinalProfile', profile);
    } else {
      localStorage.removeItem('doctrinalProfile');
    }
  };
  
  const silenceAll = () => {
    try {
      if (typeof window !== 'undefined') {
        polySynth?.releaseAll();
      }
    } catch (e) {
      console.error("Failed to silence all sounds", e);
    }
  };

  const resetGame = () => {
    silenceAll();
    setGameMode(null);
    setActiveLesson(null);
    setLearningProfile({
      bloomLevels: {},
      competencies: {},
      themes: {},
      books: {},
      totalChallenges: 0
    });
    // Clear URL parameter cleanly
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    setTeamsState(prevTeams => resetTeamStats(prevTeams));
  }

  const restartCurrentGame = () => {
    silenceAll();
    setTeamsState(prevTeams => resetTeamStats(prevTeams));
    setGameRestarted(prev => prev + 1);
  };

  const toggleSound = () => {
    const newSoundState = !isSoundOn;
    setIsSoundOn(newSoundState);
    localStorage.setItem('soundOn', JSON.stringify(newSoundState));
    if (!newSoundState) {
      silenceAll();
    } else if (Tone.context.state !== 'running') {
      Tone.start();
    }
    playSound('click');
  };

  const playSound = (sound: 'correct' | 'incorrect' | 'click' | 'times-up' | 'tick') => {
    if (!isSoundOn || typeof window === 'undefined') return;
    
    const nowMs = Date.now();
    const lastTime = lastPlayedTimesRef.current[sound] || 0;
    if (nowMs - lastTime < 50) {
      return;
    }
    lastPlayedTimesRef.current[sound] = nowMs;

    if (Tone.context.state !== 'running') {
        Tone.start().catch(e => console.error("Tone.start() failed", e));
        return;
    }

    try {
      const now = Tone.now();
      switch (sound) {
        case 'correct':
          // Warm ascending major triad arpeggio (C4, E4, G4, C5)
          polySynth.triggerAttackRelease('C4', '8n', now);
          polySynth.triggerAttackRelease('E4', '8n', now + 0.12);
          polySynth.triggerAttackRelease('G4', '8n', now + 0.24);
          polySynth.triggerAttackRelease('C5', '4n', now + 0.36);
          break;
        case 'incorrect':
          // Warm descending minor third (A3, F#3)
          polySynth.triggerAttackRelease('A3', '8n', now);
          polySynth.triggerAttackRelease('F#3', '4n', now + 0.15);
          break;
        case 'click':
          clickSynth.triggerAttackRelease('C6', '32n', now);
          break;
        case 'times-up':
          bellSynth.triggerAttackRelease("G4", "2n", now);
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

  const t = getTranslation(language);
  const bibleData = getBibleData(language, bibleVersion);

  return (
    <GameContext.Provider value={{
      teams, setTeams,
      gameMode, setGameMode,
      difficulty, setDifficulty,
      isPracticeMode, setPracticeMode,
      isSoundOn, toggleSound, playSound,
      updateScore, updateLives,
      resetGame, restartCurrentGame, gameRestarted,
      roundTime, setRoundTime: handleSetRoundTime,
      language, setLanguage,
      bibleVersion, setBibleVersion,
      isPremium, setIsPremium,
      t, bibleData,
      activeLesson, setActiveLesson,
      hasConfiguredLanguage, setHasConfiguredLanguage,
      userSettings, setUserSettings,
      doctrinalProfile, setDoctrinalProfile,
      syncStatus, setSyncStatus,
      learningProfile, setLearningProfile
    }}>
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

"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { changeProgressOwner, progressOwner, progressStorageKey } from '@/lib/practice';
import * as Tone from 'tone';
import { getTranslation, TranslationType } from '@/data/locales';
import { getBibleData, BibleCatalog } from '@/data/bibleData';
import { LearningProfile } from '@/types/education';

const safeStorage = {
  getItem(key: string) { try { return localStorage.getItem(key); } catch { return null; } },
  setItem(key: string, value: string) { try { localStorage.setItem(key,value); } catch {} },
  removeItem(key: string) { try { localStorage.removeItem(key); } catch {} }
};

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


interface GameContextType {
  storageOwner:string;
  preferencesReady: boolean;
  pendingRoundId: string | null;
  setPendingRoundId: (id: string | null) => void;
  restoreRoundConfig: (config: any) => void;
  includeGuidedContent: boolean;
  setIncludeGuidedContent: (value: boolean) => void;
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
  doctrinalProfile?: string;
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
  const [preferencesReady,setPreferencesReady]=useState(false);
  const [storageOwner,setStorageOwner]=useState('guest');
  const [profileOwner,setProfileOwner]=useState<string|null>(null);
  const [pendingRoundId,setPendingRoundId]=useState<string|null>(null);
  const [includeGuidedContent, setIncludeGuidedContent] = useState(false);
  const [teams, setTeamsState] = useState<Team[]>([
    { name: 'Equipo Ámbar', score: 0, lives: INITIAL_LIVES },
    { name: 'Equipo Celeste', score: 0, lives: INITIAL_LIVES },
  ]);
  const teamsRef = useRef(teams);
  teamsRef.current = teams;
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [difficulty, setDifficultyState] = useState<DifficultyLevel>('principiante');
  const [isPracticeMode, setPracticeMode] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [roundTime, setRoundTime] = useState(60);
  const [gameRestarted, setGameRestarted] = useState(0);
  
  // New States
  const [language, setLanguageState] = useState<'es' | 'en'>('es');
  const [bibleVersion, setBibleVersionState] = useState<string>('rvr1960');
  const [isPremium, setIsPremiumState] = useState<boolean>(false);
  const [activeLesson, setActiveLesson] = useState<LessonType | null>(null);
  const [hasConfiguredLanguage, setHasConfiguredLanguage] = useState<boolean>(true);
  // El catálogo se ofrece sin segmentación denominacional.
  const doctrinalProfile = undefined;
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('offline');
  // Load persisted learning profile on mount
  const [learningProfile, setLearningProfile] = useState<LearningProfile>({ bloomLevels: {}, competencies: {}, themes: {}, books: {}, totalChallenges: 0 });

  useEffect(()=>{
    let cancelled=false;let changedSinceStart=false;
    const load=()=>{
      const owner=progressOwner();setStorageOwner(owner);
      let next:LearningProfile={bloomLevels:{},competencies:{},themes:{},books:{},totalChallenges:0};
      try{const value=JSON.parse(localStorage.getItem(progressStorageKey('divina_palabra_learning_profile',owner))||'null');if(value&&['bloomLevels','competencies','themes','books'].every(k=>value[k]&&typeof value[k]==='object')&&Number.isFinite(value.totalChallenges))next=value;}catch{}
      setLearningProfile(next);setProfileOwner(owner);setPreferencesReady(true);
    };
    const changed=()=>{changedSinceStart=true;setPendingRoundId(null);setGameMode(null);setActiveLesson(null);load();};
    const otherTab=(e:StorageEvent)=>{if(e.key==='dp_owner_v1')window.location.reload();};
    window.addEventListener('dp-owner-change',changed);window.addEventListener('dp-progress-copied',load);window.addEventListener('storage',otherTab);
    fetch('/api/identity',{cache:'no-store',signal:AbortSignal.timeout(5000)}).then(r=>{if(!r.ok)throw new Error('Sin servicio');return r.json();}).then(x=>{if(!cancelled&&!changedSinceStart){changeProgressOwner(x.user?.id||'guest');load();}}).catch(()=>{if(!cancelled)load();});
    return()=>{cancelled=true;window.removeEventListener('dp-owner-change',changed);window.removeEventListener('dp-progress-copied',load);window.removeEventListener('storage',otherTab);};
  },[]);
  useEffect(()=>{
    if(!preferencesReady||profileOwner!==storageOwner||storageOwner!==progressOwner())return;
    safeStorage.setItem(progressStorageKey('divina_palabra_learning_profile',storageOwner),JSON.stringify(learningProfile));
  },[learningProfile,preferencesReady,profileOwner,storageOwner]);
  const lastPlayedTimesRef = useRef<Record<string, number>>({});

  const resetTeamStats = (teams: Team[]) => {
    return teams.map(team => ({...team, score: 0, lives: INITIAL_LIVES}));
  }

  // Load configuration on mount
  useEffect(() => {
    const savedSound = safeStorage.getItem('soundOn');
    if (savedSound) {
      setIsSoundOn(savedSound === 'true');
    }
    const savedRoundTime = safeStorage.getItem('roundTime');
    if (savedRoundTime) {
      setRoundTime(Math.max(60, Math.min(600, Number(savedRoundTime) || 60)));
    }
    const savedDifficulty = safeStorage.getItem('difficulty');
    if (savedDifficulty) {
      try {const value=JSON.parse(savedDifficulty);setDifficultyState(['principiante','discipulo','avanzado'].includes(value)?value:'principiante');}catch{}
    }
    setLanguageState('es');
    setHasConfiguredLanguage(true);
    safeStorage.setItem('language', JSON.stringify('es'));
    const savedVersion = safeStorage.getItem('bibleVersion');
    try {
      const version = JSON.parse(savedVersion || '"rvr1960"');
      setBibleVersionState(['rvr1960','nvi','ntv'].includes(version) ? version : 'rvr1960');
    } catch { setBibleVersionState('rvr1960'); }

    const savedPremium = safeStorage.getItem('isPremium');
    if (savedPremium) {
      setIsPremiumState(savedPremium === 'true');
    }

    safeStorage.removeItem('userSettings');
    // Las preferencias antiguas no reactivan filtros denominacionales.
  }, []);

  useEffect(() => {
    // Borrar la clasificación etaria de versiones anteriores sin recopilarla.
    try { safeStorage.removeItem('userSettings'); } catch {}
  }, []);

  const handleSetRoundTime = (time: number) => {
    setRoundTime(time);
    safeStorage.setItem('roundTime', JSON.stringify(time));
  };
  
  const setDifficulty = (newDifficulty: DifficultyLevel) => {
    setDifficultyState(newDifficulty);
    safeStorage.setItem('difficulty', JSON.stringify(newDifficulty));
  };

  const setTeams = (newTeams: Team[]) => {
    setTeamsState(newTeams);
    safeStorage.setItem('gameTeams', JSON.stringify(newTeams.map(({ name }) => ({ name }))));
  };

  const setLanguage = (_lang: 'es' | 'en') => {
    setLanguageState('es');
    safeStorage.setItem('language', JSON.stringify('es'));
    setHasConfiguredLanguage(true);
  };

  const setBibleVersion = (version: string) => {
    if (!['rvr1960','nvi','ntv'].includes(version)) return;
    setBibleVersionState(version);
    safeStorage.setItem('bibleVersion', JSON.stringify(version));
  };

  const setIsPremium = (premium: boolean) => {
    setIsPremiumState(premium);
    safeStorage.setItem('isPremium', JSON.stringify(premium));
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
    safeStorage.setItem('soundOn', JSON.stringify(newSoundState));
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
    setTeamsState(prev => prev.map((team, index) => index === teamIndex ? { ...team, score: team.score + points } : team));
  };
  const updateLives = (teamIndex: number, change: number): number => {
    const newLives = Math.max(0, (teamsRef.current[teamIndex]?.lives ?? 0) + change);
    teamsRef.current = teamsRef.current.map((team, index) => index === teamIndex ? { ...team, lives: newLives } : team);
    setTeamsState(prev => prev.map((team, index) => index === teamIndex ? { ...team, lives: newLives } : team));
    return newLives;
  };

  const restoreRoundConfig = (c: any) => {
    setTeamsState(c.teams); setGameMode(c.gameMode); setDifficultyState(c.difficulty);
    setPracticeMode(c.isPracticeMode); setRoundTime(c.roundTime); setBibleVersionState(c.bibleVersion);
    setIncludeGuidedContent(!!c.includeGuidedContent); setActiveLesson(c.activeLesson || null); setGameRestarted(0);
  };

  const t = getTranslation(language);
  const bibleData = getBibleData(language, bibleVersion);

  return (
    <GameContext.Provider value={{
      storageOwner, pendingRoundId, setPendingRoundId, preferencesReady, restoreRoundConfig, includeGuidedContent, setIncludeGuidedContent,
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
      doctrinalProfile,
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

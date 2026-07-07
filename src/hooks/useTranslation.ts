"use client";

import { useState, useEffect } from 'react';
import { getTranslation, TranslationType } from '@/data/locales';
import { useGame } from '@/contexts/GameContext';

export function useTranslation(): TranslationType {
  const { language } = useGame();
  const [t, setT] = useState<TranslationType>(getTranslation(language));

  useEffect(() => {
    let mounted = true;
    
    // Local fallback
    setT(getTranslation(language));

    // Try OTA
    fetch(`/locales/${language}.json`)
      .then(res => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(data => {
        if (mounted && data) {
          setT(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => {
        // Use local fallback
      });

    return () => {
      mounted = false;
    };
  }, [language]);

  return t;
}

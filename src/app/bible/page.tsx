"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { bibleBooks, BookMetadata } from '@/data/bibleMetadata';
import { BookOpen, Search, Copy, Check, Printer, Share2, Plus, Trash2, ArrowRight, BookMarked, FileText } from 'lucide-react';

interface Verse {
  number: number;
  text: string;
}

export default function BiblePage() {
  const { language, playSound, bibleVersion: globalBibleVersion, t } = useGame();

  // Bible State
  const [bibleVersion, setBibleVersion] = useState<string>(globalBibleVersion);
  const [selectedBook, setSelectedBook] = useState<BookMetadata>(bibleBooks[0]);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [selectedVerseNumber, setSelectedVerseNumber] = useState<number | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Reactive search and validation states
  const [bookSearchQuery, setBookSearchQuery] = useState<string>('');
  const [verseSearchQuery, setVerseSearchQuery] = useState<string>('');
  const [isBookDropdownOpen, setIsBookDropdownOpen] = useState<boolean>(false);
  const [chapterInputValue, setChapterInputValue] = useState<string>('1');
  const [verseInputValue, setVerseInputValue] = useState<string>('');
  const bookSelectorRef = useRef<HTMLDivElement>(null);

  // Sermon State
  const [sermonTitle, setSermonTitle] = useState<string>('');
  const [sermonTopic, setSermonTopic] = useState<string>('');
  const [sermonIntro, setSermonIntro] = useState<string>('');
  const [sermonVerses, setSermonVerses] = useState<string[]>([]);
  const [sermonPoints, setSermonPoints] = useState<string[]>(['']);
  const [sermonAppl, setSermonAppl] = useState<string>('');
  const [sermonConc, setSermonConc] = useState<string>('');

  // UI State
  const [activeTab, setActiveTab] = useState<'reader' | 'sermon'>('reader');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [shared, setShared] = useState<boolean>(false);
  const [isSharedSermonMode, setIsSharedSermonMode] = useState<boolean>(false);

  // Sync with global bible version on load
  useEffect(() => {
    setBibleVersion(globalBibleVersion);
  }, [globalBibleVersion]);

  // Sync search input when selected book or language changes
  useEffect(() => {
    setBookSearchQuery(language === 'es' ? selectedBook.nameEs : selectedBook.nameEn);
  }, [selectedBook, language]);

  // Sync inputs with state changes
  useEffect(() => {
    setChapterInputValue(selectedChapter.toString());
  }, [selectedChapter]);

  useEffect(() => {
    setVerseInputValue(selectedVerseNumber ? selectedVerseNumber.toString() : '');
  }, [selectedVerseNumber]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bookSelectorRef.current && !bookSelectorRef.current.contains(event.target as Node)) {
        setIsBookDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll to selected verse with small delay to let DOM render
  useEffect(() => {
    if (selectedVerseNumber) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`verse-card-${selectedVerseNumber}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedVerseNumber]);

  // Function to remove accents/diacritics for search matching
  const normalizeText = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  // Reactive book filter
  const filteredBooks = bibleBooks.filter((b) => {
    const query = normalizeText(bookSearchQuery).trim();
    if (!query) return true;
    const nameEs = normalizeText(b.nameEs);
    const nameEn = normalizeText(b.nameEn);
    return nameEs.includes(query) || nameEn.includes(query);
  });

  // Load sermon from localStorage on mount
  useEffect(() => {
    const savedSermon = localStorage.getItem('draftSermon');
    if (savedSermon) {
      try {
        const data = JSON.parse(savedSermon);
        setSermonTitle(data.title || '');
        setSermonTopic(data.topic || '');
        setSermonIntro(data.intro || '');
        setSermonVerses(data.verses || []);
        setSermonPoints(data.points || ['']);
        setSermonAppl(data.appl || '');
        setSermonConc(data.conc || '');
      } catch (e) {
        console.error("Failed to parse draft sermon", e);
      }
    }
  }, []);

  // Check if URL has a shared sermon
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sharedSermonB64 = params.get('sermon');
      if (sharedSermonB64) {
        try {
          const decoded = decodeURIComponent(escape(atob(sharedSermonB64)));
          const data = JSON.parse(decoded);
          setSermonTitle(data.title || '');
          setSermonTopic(data.topic || '');
          setSermonIntro(data.intro || '');
          setSermonVerses(data.verses || []);
          setSermonPoints(data.points || ['']);
          setSermonAppl(data.appl || '');
          setSermonConc(data.conc || '');
          setActiveTab('sermon');
          setIsSharedSermonMode(true);
        } catch (e) {
          console.error("Failed to decode shared sermon", e);
        }
      }
    }
  }, []);

  // Save sermon drafts to localStorage
  useEffect(() => {
    if (!isSharedSermonMode) {
      const data = {
        title: sermonTitle,
        topic: sermonTopic,
        intro: sermonIntro,
        verses: sermonVerses,
        points: sermonPoints,
        appl: sermonAppl,
        conc: sermonConc
      };
      localStorage.setItem('draftSermon', JSON.stringify(data));
    }
  }, [sermonTitle, sermonTopic, sermonIntro, sermonVerses, sermonPoints, sermonAppl, sermonConc, isSharedSermonMode]);

  // Fetch Bible text helper
  const getSpanishSlug = (id: string) => {
    const slugMap: Record<string, string> = {
      '1samuel': '1-samuel',
      '2samuel': '2-samuel',
      '1reyes': '1-reyes',
      '2reyes': '2-reyes',
      '1cronicas': '1-cronicas',
      '2cronicas': '2-cronicas',
      '1corintios': '1-corintios',
      '2corintios': '2-corintios',
      '1tesalonicenses': '1-tesalonicenses',
      '2tesalonicenses': '2-tesalonicenses',
      '1timoteo': '1-timoteo',
      '2timoteo': '2-timoteo',
      '1pedro': '1-pedro',
      '2pedro': '2-pedro',
      '1juan': '1-juan',
      '2juan': '2-juan',
      '3juan': '3-juan',
    };
    return slugMap[id] || id;
  };

  const fetchBibleText = async () => {
    setIsLoading(true);
    setError(null);
    setVerses([]);

    try {
      if (language === 'es') {
        const bookSlug = getSpanishSlug(selectedBook.id);
        const version = bibleVersion === 'nvi' ? 'nvi' : 'rv1960';
        const url = `https://bible-api.deno.dev/api/read/${version}/${bookSlug}/${selectedChapter}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Could not load verses");
        const data = await res.json();
        
        const versesArray = data.vers || [];
        const formatted: Verse[] = versesArray.map((v: any) => ({
          number: v.number,
          text: v.verse || ''
        }));
        setVerses(formatted);
      } else {
        // English
        const bookName = encodeURIComponent(selectedBook.nameEn);
        const version = bibleVersion === 'kjv' ? 'kjv' : bibleVersion === 'esv' ? 'oeb-us' : 'web';
        const url = `https://bible-api.com/${bookName}+${selectedChapter}?translation=${version}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Could not load verses");
        const data = await res.json();
        
        const formatted: Verse[] = data.verses.map((v: any) => ({
          number: v.verse,
          text: v.text
        }));
        setVerses(formatted);
      }
    } catch (e: any) {
      console.error(e);
      setError(language === 'es' 
        ? "No se pudo cargar la Biblia en este momento. Revisa tu conexión." 
        : "Failed to load the Bible. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch when book or chapter or version changes
  useEffect(() => {
    fetchBibleText();
    setSelectedVerseNumber(null);
    setVerseSearchQuery('');
  }, [selectedBook, selectedChapter, bibleVersion]);

  // Handle adding verse to sermon
  const addVerseToSermon = (verse: Verse) => {
    playSound('click');
    const ref = `${selectedBook.nameEs} ${selectedChapter}:${verse.number} (${bibleVersion.toUpperCase()})`;
    const fullText = `"${verse.text.trim()}" - ${ref}`;
    if (!sermonVerses.includes(fullText)) {
      setSermonVerses([...sermonVerses, fullText]);
    }
  };

  // Naming points helpers
  const handlePointChange = (index: number, val: string) => {
    const updated = [...sermonPoints];
    updated[index] = val;
    setSermonPoints(updated);
  };

  const addPoint = () => {
    playSound('click');
    setSermonPoints([...sermonPoints, '']);
  };

  const removePoint = (index: number) => {
    playSound('click');
    const updated = sermonPoints.filter((_, i) => i !== index);
    setSermonPoints(updated.length > 0 ? updated : ['']);
  };

  // Share sermon
  const handleShareSermon = () => {
    playSound('correct');
    const data = {
      title: sermonTitle,
      topic: sermonTopic,
      intro: sermonIntro,
      verses: sermonVerses,
      points: sermonPoints,
      appl: sermonAppl,
      conc: sermonConc
    };
    const jsonStr = JSON.stringify(data);
    const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
    const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
    const shareUrl = `${baseUrl}/bible?sermon=${b64}`;

    navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  // Print sermon
  const handlePrintSermon = () => {
    playSound('click');
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Reset shared view to write again
  const handleCreateNewSermon = () => {
    playSound('click');
    setIsSharedSermonMode(false);
    setSermonTitle('');
    setSermonTopic('');
    setSermonIntro('');
    setSermonVerses([]);
    setSermonPoints(['']);
    setSermonAppl('');
    setSermonConc('');
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* PRINT-ONLY CONTAINER (HIDDEN IN UI) */}
      <div className="hidden print:block print:text-black print:bg-white w-full max-w-4xl p-8 space-y-6">
        <div className="text-center border-b pb-4">
          <h1 className="text-3xl font-bold uppercase">{sermonTitle || 'Bosquejo de Sermón'}</h1>
          {sermonTopic && <p className="text-gray-600 text-sm mt-1">Tema: {sermonTopic}</p>}
        </div>

        {sermonIntro && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1">1. Introducción</h2>
            <p className="mt-2 text-gray-800 whitespace-pre-wrap">{sermonIntro}</p>
          </div>
        )}

        {sermonVerses.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1">2. Lectura Bíblica</h2>
            <ul className="mt-2 list-disc list-inside space-y-2 text-gray-800 italic">
              {sermonVerses.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
        )}

        {sermonPoints.some(p => p.trim()) && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1">3. Desarrollo del Mensaje</h2>
            <ol className="mt-2 list-decimal list-inside space-y-2 text-gray-800">
              {sermonPoints.filter(p => p.trim()).map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
          </div>
        )}

        {sermonAppl && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1">4. Aplicación Práctica</h2>
            <p className="mt-2 text-gray-800 whitespace-pre-wrap">{sermonAppl}</p>
          </div>
        )}

        {sermonConc && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1">5. Conclusión</h2>
            <p className="mt-2 text-gray-800 whitespace-pre-wrap">{sermonConc}</p>
          </div>
        )}
      </div>

      <main className="flex flex-col items-center justify-center w-full max-w-4xl animate-fade-in z-10 print:hidden mb-8">
        {/* Navigation Tabs between Reader & Sermon */}
        <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 mb-4 w-full max-w-md">
          <Button
            onClick={() => { playSound('click'); setActiveTab('reader'); }}
            className={`flex-grow font-bold rounded-xl py-3 flex items-center justify-center gap-2 ${activeTab === 'reader' ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-600 hover:to-yellow-600' : 'bg-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <BookOpen className="w-4 h-4" />
            {language === 'es' ? 'Buscador Biblia' : 'Bible Finder'}
          </Button>
          <Button
            onClick={() => { playSound('click'); setActiveTab('sermon'); }}
            className={`flex-grow font-bold rounded-xl py-3 flex items-center justify-center gap-2 ${activeTab === 'sermon' ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-600 hover:to-yellow-600' : 'bg-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <FileText className="w-4 h-4" />
            {isSharedSermonMode 
              ? (language === 'es' ? 'Sermón Compartido' : 'Shared Sermon')
              : (language === 'es' ? 'Bosquejo Sermón' : 'Sermon Outliner')
            }
          </Button>
        </div>

        {/* Tab 1: Bible Reader */}
        {activeTab === 'reader' && (
          <Card className="w-full bg-slate-900/80 backdrop-blur-md border-primary/30 shadow-2xl rounded-3xl overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />
            
            <CardHeader className="pt-6 pb-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <BookMarked className="w-8 h-8 text-amber-400" />
                  <div>
                    <CardTitle className="font-headline text-2xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-yellow-500">
                      {language === 'es' ? 'Estudio Bíblico Reactivo' : 'Reactive Bible Study'}
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      {language === 'es' ? 'Buscador intuitivo libro, capítulo y versículo' : 'Intuitive search by book, chapter and verse'}
                    </CardDescription>
                  </div>
                </div>

                {/* Bible Version Selection */}
                <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800 w-full md:w-auto">
                  <span className="text-xs font-semibold text-slate-400 px-2">Version:</span>
                  <Select value={bibleVersion} onValueChange={(val: string) => { playSound('click'); setBibleVersion(val); }}>
                    <SelectTrigger className="w-full md:w-[290px] bg-slate-900 border-slate-800 text-xs text-amber-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                      {language === 'es' ? (
                        <>
                          <SelectItem value="rvr1960" className="focus:bg-amber-500 focus:text-slate-950">Reina-Valera 1960 (Requiere Internet)</SelectItem>
                          <SelectItem value="nvi" className="focus:bg-amber-500 focus:text-slate-950">Nueva Versión Internacional (Requiere Internet)</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="kjv" className="focus:bg-amber-500 focus:text-slate-950">King James Version (Internet required)</SelectItem>
                          <SelectItem value="niv" className="focus:bg-amber-500 focus:text-slate-950">New International Version (Internet required)</SelectItem>
                          <SelectItem value="esv" className="focus:bg-amber-500 focus:text-slate-950">English Standard Version (Internet required)</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
 
            <CardContent className="space-y-4 p-6">
              {/* Sequential Selectors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                {/* Book Selector (Reactive Search) */}
                <div className="flex flex-col gap-1.5 relative" ref={bookSelectorRef}>
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'es' ? '1. Libro' : '1. Book'}
                  </Label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder={language === 'es' ? "Escribe para buscar..." : "Type to search..."}
                      value={bookSearchQuery}
                      onChange={(e) => {
                        setBookSearchQuery(e.target.value);
                        setIsBookDropdownOpen(true);
                      }}
                      onFocus={() => setIsBookDropdownOpen(true)}
                      className="bg-slate-900 border-slate-800 text-sm text-slate-200 w-full"
                    />
                    {isBookDropdownOpen && (
                      <div className="absolute left-0 right-0 z-30 mt-1 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl max-h-56 overflow-y-auto p-1.5 scrollbar-thin">
                        {filteredBooks.length === 0 ? (
                          <div className="p-3 text-xs text-slate-500 text-center">
                            {language === 'es' ? 'No se encontraron libros' : 'No books found'}
                          </div>
                        ) : (
                          filteredBooks.map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => {
                                playSound('click');
                                setSelectedBook(b);
                                setSelectedChapter(1);
                                setSelectedVerseNumber(null);
                                setIsBookDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex justify-between items-center ${
                                selectedBook.id === b.id 
                                  ? 'bg-amber-500/20 text-amber-300 font-bold' 
                                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                              }`}
                            >
                              <span>{language === 'es' ? b.nameEs : b.nameEn}</span>
                              <span className="text-[10px] text-slate-500">
                                {b.chapters} {language === 'es' ? 'caps' : 'chaps'}
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
 
                {/* Chapter Selector (Validated Input) */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'es' ? '2. Capítulo (Max: ' + selectedBook.chapters + ')' : '2. Chapter (Max: ' + selectedBook.chapters + ')'}
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    max={selectedBook.chapters}
                    value={chapterInputValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      setChapterInputValue(val);
                      const parsed = parseInt(val);
                      if (!isNaN(parsed)) {
                        const clamped = Math.max(1, Math.min(selectedBook.chapters, parsed));
                        setSelectedChapter(clamped);
                      }
                    }}
                    onBlur={() => {
                      setChapterInputValue(selectedChapter.toString());
                    }}
                    className="bg-slate-900 border-slate-800 text-sm text-slate-200"
                  />
                </div>
 
                {/* Verse Selector (Validated Input to Scroll & Highlight) */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'es' 
                      ? '3. Versículo ' + (verses.length > 0 ? '(Max: ' + verses.length + ')' : '')
                      : '3. Verse ' + (verses.length > 0 ? '(Max: ' + verses.length + ')' : '')
                    }
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    max={verses.length || 1}
                    disabled={verses.length === 0}
                    value={verseInputValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      setVerseInputValue(val);
                      const parsed = parseInt(val);
                      if (!isNaN(parsed) && verses.length > 0) {
                        const clamped = Math.max(1, Math.min(verses.length, parsed));
                        setSelectedVerseNumber(clamped);
                      } else if (val === "") {
                        setSelectedVerseNumber(null);
                      }
                    }}
                    onBlur={() => {
                      setVerseInputValue(selectedVerseNumber ? selectedVerseNumber.toString() : "");
                    }}
                    placeholder={verses.length > 0 ? `1 - ${verses.length}` : "-"}
                    className="bg-slate-900 border-slate-800 text-sm text-slate-200"
                  />
                </div>
              </div>

              {/* Bible Text Reader */}
              <div className="border border-slate-800 bg-slate-950/40 rounded-2xl overflow-hidden">
                <div className="bg-slate-900/50 px-4 py-3 border-b border-slate-800/80 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-amber-300">
                    {language === 'es' ? selectedBook.nameEs : selectedBook.nameEn} {selectedChapter}
                  </h3>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                    {language === 'es' ? 'Presiona un versículo para añadirlo al sermón' : 'Tap a verse to add it to your sermon'}
                  </span>
                </div>

                {/* Quick verse search filter */}
                {verses.length > 0 && !isLoading && !error && (
                  <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/40 flex items-center gap-2">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <Input
                      type="text"
                      value={verseSearchQuery}
                      onChange={(e) => setVerseSearchQuery(e.target.value)}
                      placeholder={language === 'es' ? "Filtrar versículos por palabra clave..." : "Filter verses by keyword..."}
                      className="bg-transparent border-none text-xs text-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-500 h-8 p-0"
                    />
                    {verseSearchQuery && (
                      <Button onClick={() => setVerseSearchQuery('')} variant="ghost" size="sm" className="text-[10px] text-slate-400 hover:text-slate-200 h-6 px-1.5 rounded-md">
                        {language === 'es' ? 'Limpiar' : 'Clear'}
                      </Button>
                    )}
                  </div>
                )}

                <ScrollArea className="h-96 p-4">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full py-20 space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
                      <span className="text-xs text-slate-400">{language === 'es' ? 'Cargando Escrituras...' : 'Loading Scriptures...'}</span>
                    </div>
                  ) : error ? (
                    <div className="text-center py-20 text-red-400 text-sm">{error}</div>
                  ) : verses.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 text-sm">
                      {language === 'es' ? 'Selecciona un libro y capítulo para comenzar' : 'Select a book and chapter to begin'}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(() => {
                        const filtered = verses.filter(v => {
                          const query = normalizeText(verseSearchQuery).trim();
                          if (!query) return true;
                          return normalizeText(v.text).includes(query);
                        });
                        if (filtered.length === 0 && verseSearchQuery) {
                          return (
                            <div className="text-center py-10 text-slate-500 text-xs">
                              {language === 'es' ? 'Ningún versículo coincide con tu búsqueda' : 'No verses match your search'}
                            </div>
                          );
                        }
                        return filtered.map((v) => (
                          <div 
                            key={v.number}
                            id={`verse-card-${v.number}`}
                            onClick={() => addVerseToSermon(v)}
                            className={`p-3 rounded-xl border text-sm cursor-pointer transition-all flex items-start gap-3 group ${
                              selectedVerseNumber === v.number 
                                ? 'bg-amber-500/20 border-amber-500 text-amber-200' 
                                : 'bg-slate-900/30 border-slate-850 text-slate-300 hover:bg-slate-800/20 hover:border-slate-800'
                            }`}
                          >
                            <span className="text-amber-400 font-bold font-mono text-xs mt-0.5 shrink-0 bg-slate-950/60 px-1.5 py-0.5 rounded border border-slate-800">
                              {v.number}
                            </span>
                            <p className="leading-relaxed flex-grow">{v.text}</p>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-amber-500/10 border border-amber-500/30 rounded px-2 py-0.5 text-[10px] text-amber-400 shrink-0 self-center">
                              + {language === 'es' ? 'Añadir' : 'Add'}
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 2: Sermon Builder */}
        {activeTab === 'sermon' && (
          <Card className="w-full bg-slate-900/80 backdrop-blur-md border-primary/30 shadow-2xl rounded-3xl overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />
            
            <CardHeader className="pt-6 pb-2 flex flex-row justify-between items-center">
              <div>
                <CardTitle className="font-headline text-2xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-yellow-500 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-amber-400" />
                  {language === 'es' ? 'Preparador de Mensajes' : 'Sermon Assistant'}
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  {language === 'es' ? 'Guía práctica para estructurar y exportar sermones profesionales' : 'Practical guide to structure and export professional sermons'}
                </CardDescription>
              </div>
              
              {isSharedSermonMode && (
                <Button onClick={handleCreateNewSermon} size="sm" variant="outline" className="border-amber-500/30 text-amber-400">
                  {language === 'es' ? 'Crear Nuevo' : 'Create New'}
                </Button>
              )}
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              {/* Form Fields */}
              <div className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <Label htmlFor="sermon-title" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'es' ? 'Título del Sermón' : 'Sermon Title'}
                  </Label>
                  <Input
                    id="sermon-title"
                    value={sermonTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSermonTitle(e.target.value)}
                    disabled={isSharedSermonMode}
                    placeholder={language === 'es' ? 'Ej. El Poder de la Fe' : 'e.g. The Power of Faith'}
                    className="bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50 text-base"
                  />
                </div>

                {/* Topic */}
                <div className="space-y-1.5">
                  <Label htmlFor="sermon-topic" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'es' ? 'Tema o Asunto Central' : 'Central Theme / Topic'}
                  </Label>
                  <Input
                    id="sermon-topic"
                    value={sermonTopic}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSermonTopic(e.target.value)}
                    disabled={isSharedSermonMode}
                    placeholder={language === 'es' ? 'Ej. Confianza en las tormentas' : 'Central message/focus'}
                    className="bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50"
                  />
                </div>

                {/* Introduction */}
                <div className="space-y-1.5">
                  <Label htmlFor="sermon-intro" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'es' ? 'Introducción' : 'Introduction'}
                  </Label>
                  <Textarea
                    id="sermon-intro"
                    value={sermonIntro}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSermonIntro(e.target.value)}
                    disabled={isSharedSermonMode}
                    placeholder={language === 'es' ? 'Escribe cómo captarás la atención de tu congregación...' : 'Introductory words...'}
                    className="bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50 h-24"
                  />
                </div>

                {/* Biblical Verses selected */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'es' ? 'Pasajes de Apoyo' : 'Supporting Passages'}
                  </Label>
                  {sermonVerses.length === 0 ? (
                    <div className="text-xs text-slate-500 border border-dashed border-slate-800 p-4 rounded-xl text-center">
                      {language === 'es' 
                        ? 'No hay versículos agregados aún. Usa el buscador bíblico y toca un versículo para añadirlo.' 
                        : 'No verses added yet. Search the Bible and click on a verse to append it here.'}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {sermonVerses.map((v, idx) => (
                        <div key={idx} className="flex gap-2 items-center bg-slate-950 border border-slate-850 p-2.5 rounded-xl text-xs">
                          <p className="flex-grow italic text-slate-300">{v}</p>
                          {!isSharedSermonMode && (
                            <Button 
                              onClick={() => {
                                playSound('click');
                                setSermonVerses(sermonVerses.filter((_, i) => i !== idx));
                              }} 
                              size="icon" 
                              variant="ghost" 
                              className="text-red-400 hover:text-red-300 h-7 w-7"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main Points */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex justify-between items-center">
                    <span>{language === 'es' ? 'Puntos Clave del Desarrollo' : 'Main Message Points'}</span>
                    {!isSharedSermonMode && (
                      <Button onClick={addPoint} size="sm" variant="ghost" className="text-amber-400 hover:text-amber-300 text-[11px] h-6">
                        + {language === 'es' ? 'Agregar Punto' : 'Add Point'}
                      </Button>
                    )}
                  </Label>
                  <div className="space-y-2">
                    {sermonPoints.map((pt, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={pt}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePointChange(idx, e.target.value)}
                          disabled={isSharedSermonMode}
                          placeholder={language === 'es' ? `Punto ${idx + 1}` : `Point ${idx + 1}`}
                          className="bg-slate-950 border-slate-805 text-slate-200 text-sm flex-grow"
                        />
                        {!isSharedSermonMode && (
                          <Button 
                            onClick={() => removePoint(idx)} 
                            size="icon" 
                            variant="ghost" 
                            className="text-slate-500 hover:text-red-400 shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application */}
                <div className="space-y-1.5">
                  <Label htmlFor="sermon-appl" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'es' ? 'Aplicación Práctica' : 'Practical Application'}
                  </Label>
                  <Textarea
                    id="sermon-appl"
                    value={sermonAppl}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSermonAppl(e.target.value)}
                    disabled={isSharedSermonMode}
                    placeholder={language === 'es' ? '¿Cómo aplicamos esto a nuestra vida hoy?' : 'How does this apply to daily life?'}
                    className="bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50 h-20"
                  />
                </div>

                {/* Conclusion */}
                <div className="space-y-1.5">
                  <Label htmlFor="sermon-conc" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'es' ? 'Conclusión' : 'Conclusion'}
                  </Label>
                  <Textarea
                    id="sermon-conc"
                    value={sermonConc}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSermonConc(e.target.value)}
                    disabled={isSharedSermonMode}
                    placeholder={language === 'es' ? 'Un llamado a la acción o palabras finales de reflexión...' : 'Closing remarks...'}
                    className="bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50 h-20"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
                <Button 
                  onClick={handlePrintSermon}
                  className="flex-grow bg-slate-950 border border-slate-800 text-slate-200 hover:bg-slate-900 font-bold py-5 rounded-2xl flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  {language === 'es' ? 'Imprimir / Guardar PDF' : 'Print / Save PDF'}
                </Button>

                <Button 
                  onClick={handleShareSermon}
                  className="flex-grow bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-600 hover:to-yellow-600 font-bold py-5 rounded-2xl flex items-center justify-center gap-2"
                >
                  {shared ? (
                    <>
                      <Check className="w-4 h-4" />
                      {language === 'es' ? 'Enlace Copiado' : 'Link Copied'}
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      {language === 'es' ? 'Compartir Bosquejo' : 'Share Outline'}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

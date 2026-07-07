"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { InstitutionalLogo } from '@/components/common/InstitutionalLogo';
import { ArrowLeft, Copy, Check, Share2, Plus, Trash2, Award, Star, BrainCircuit, School, BookOpen, Sparkles, Activity, ShieldCheck, Network, Route, GraduationCap, Eye, Church, Waypoints, Cpu, Settings } from 'lucide-react';
import { getBibleData } from '@/data/bibleData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InsightStatus } from '@/services/teacherInsightsEngine';
import { educationalOrchestrator } from '@/services/educationalOrchestrator';
import { systemAuditEngine, AuditIndicatorStatus } from '@/services/systemAuditEngine';
import { contentGovernanceEngine, GovernanceStatus } from '@/services/contentGovernanceEngine';
import { curriculumEngine, CurriculumStatus } from '@/services/curriculumEngine';
import { assessmentEngine, AssessmentStatus } from '@/services/assessmentEngine';
import { accessibilityEngine, AccessibilityStatus } from '@/services/accessibilityEngine';
import { ministryInsightsEngine, MinistryStatus } from '@/services/ministryInsightsEngine';
import { knowledgeGraphEngine, SemanticStatus } from '@/services/knowledgeGraphEngine';
import { simulationEngine, SimulationStatus } from '@/services/simulationEngine';
import { platformHealthEngine, HealthStatus } from '@/services/platformHealthEngine';

export default function TeacherPage() {
  const router = useRouter();
  const { playSound, language, t } = useGame();
  
  // Lesson Creation States
  const [lessonName, setLessonName] = useState('');
  const [lessonLang, setLessonLang] = useState<'es' | 'en'>(language);
  const [lessonVersion, setLessonVersion] = useState(language === 'es' ? 'rvr1960' : 'niv');
  const [lessonDifficulty, setLessonDifficulty] = useState<'principiante' | 'discipulo' | 'avanzado'>('principiante');
  const [lessonMode, setLessonMode] = useState<'find-word' | 'complete-phrase' | 'guess-the-phrase'>('find-word');
  const [lessonDoctrinalProfile, setLessonDoctrinalProfile] = useState<string>('universal');
  const [reflectionQuestion, setReflectionQuestion] = useState('');
  const [selectedChallenges, setSelectedChallenges] = useState<any[]>([]);

  // Generated URL State
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync version defaults when language changes
  useEffect(() => {
    setLessonVersion(lessonLang === 'es' ? 'rvr1960' : 'niv');
    setSelectedChallenges([]);
  }, [lessonLang]);

  useEffect(() => {
    setSelectedChallenges([]);
  }, [lessonMode, lessonVersion]);

  // Load available challenges for selection
  const availableChallenges = (() => {
    const data = getBibleData(lessonLang, lessonVersion);
    const selectedProfile = lessonDoctrinalProfile === 'universal' ? undefined : lessonDoctrinalProfile;
    if (lessonMode === 'find-word') {
      const combined = [...data.findWordLevel1, ...data.findWordLevel2];
      return educationalOrchestrator.filterChallengesByDoctrine(combined, selectedProfile, 5);
    } else if (lessonMode === 'complete-phrase') {
      return educationalOrchestrator.filterChallengesByDoctrine(data.completePhraseChallenges, selectedProfile, 5);
    } else {
      return educationalOrchestrator.filterChallengesByDoctrine(data.guessPhraseChallenges, selectedProfile, 5);
    }
  })();

  // Phase 10: Teacher Insights Memoized
  const teacherInsights = useMemo(() => {
    const challengesToAnalyze = selectedChallenges.length > 0 ? selectedChallenges : availableChallenges.slice(0, 5);
    return educationalOrchestrator.analyzeLessonForTeacher(challengesToAnalyze);
  }, [selectedChallenges, availableChallenges]);

  const renderStatus = (label: string, status: InsightStatus) => {
    const colors = {
      'Excelente': 'text-green-400 bg-green-500/10 border-green-500/20',
      'Bueno': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      'Mejorable': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      'Insuficiente': 'text-red-400 bg-red-500/10 border-red-500/20',
    };
    return (
      <div className="flex justify-between items-center text-xs p-1.5 border-b border-slate-800 last:border-0">
        <span className="text-slate-400">{label}</span>
        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${colors[status]}`}>{status}</span>
      </div>
    );
  };

  // Phase 12: Enterprise QA Audit Memoized
  const systemAudit = useMemo(() => {
    const data = getBibleData(lessonLang, lessonVersion);
    return systemAuditEngine.generateFullSystemAudit(data);
  }, [lessonLang, lessonVersion]);

  const renderAuditStatus = (label: string, status: AuditIndicatorStatus) => {
    const colors = {
      'Excelente': 'text-green-400 bg-green-500/10 border-green-500/20',
      'Bueno': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      'Mejorable': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      'Crítico': 'text-red-400 bg-red-500/10 border-red-500/20',
    };
    return (
      <div className="flex justify-between items-center text-[10px] p-1 border-b border-slate-800/50 last:border-0">
        <span className="text-slate-500">{label}</span>
        <span className={`px-1.5 py-0.5 rounded uppercase font-bold border ${colors[status]}`}>{status}</span>
      </div>
    );
  };

  // Phase 13: Enterprise Content Governance Memoized
  const contentGovernance = useMemo(() => {
    const data = getBibleData(lessonLang, lessonVersion);
    return contentGovernanceEngine.auditFullCatalog(data);
  }, [lessonLang, lessonVersion]);

  const renderGovernanceStatus = (label: string, status: GovernanceStatus) => {
    const colors = {
      'Excelente': 'text-green-400 bg-green-500/10 border-green-500/20',
      'Bueno': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      'Mejorable': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      'Crítico': 'text-red-400 bg-red-500/10 border-red-500/20',
    };
    return (
      <div className="flex justify-between items-center text-[10px] p-1 border-b border-slate-800/50 last:border-0">
        <span className="text-slate-500">{label}</span>
        <span className={`px-1.5 py-0.5 rounded uppercase font-bold border ${colors[status]}`}>{status}</span>
      </div>
    );
  };

  // Phase 14: Enterprise Curriculum Engine Memoized
  const curriculumPlan = useMemo(() => {
    const challengesToAnalyze = selectedChallenges.length > 0 ? selectedChallenges : availableChallenges.slice(0, 5);
    return curriculumEngine.analyzeLessonCurriculum(challengesToAnalyze);
  }, [selectedChallenges, availableChallenges]);

  const renderCurriculumStatus = (label: string, status: CurriculumStatus) => {
    const colors = {
      'Excelente': 'text-green-400 bg-green-500/10 border-green-500/20',
      'Adecuado': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      'Requiere Ajuste': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      'Incompleto': 'text-red-400 bg-red-500/10 border-red-500/20',
    };
    return (
      <div className="flex justify-between items-center text-[10px] p-1 border-b border-slate-800/50 last:border-0">
        <span className="text-slate-500">{label}</span>
        <span className={`px-1.5 py-0.5 rounded uppercase font-bold border ${colors[status]}`}>{status}</span>
      </div>
    );
  };

  // Phase 15: Enterprise Assessment Engine Memoized
  const assessmentReport = useMemo(() => {
    const data = getBibleData(lessonLang, lessonVersion);
    const total = data.findWordLevel1.length + data.findWordLevel2.length + data.completePhraseChallenges.length + data.guessPhraseChallenges.length;
    const challengesToAnalyze = selectedChallenges.length > 0 ? selectedChallenges : availableChallenges.slice(0, 5);
    return assessmentEngine.generateAssessmentReport(challengesToAnalyze, total);
  }, [selectedChallenges, availableChallenges, lessonLang, lessonVersion]);

  const renderAssessmentStatus = (label: string, status: AssessmentStatus) => {
    const colors = {
      'Excelente': 'text-green-400 bg-green-500/10 border-green-500/20',
      'Bueno': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      'En desarrollo': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      'Requiere refuerzo': 'text-red-400 bg-red-500/10 border-red-500/20',
    };
    return (
      <div className="flex justify-between items-center text-[10px] p-1 border-b border-slate-800/50 last:border-0">
        <span className="text-slate-500">{label}</span>
        <span className={`px-1.5 py-0.5 rounded uppercase font-bold border ${colors[status]}`}>{status}</span>
      </div>
    );
  };

  // Phase 16: Enterprise Accessibility Engine Memoized
  const accessibilityReport = useMemo(() => {
    const data = getBibleData(lessonLang, lessonVersion);
    return accessibilityEngine.auditAccessibility(data);
  }, [lessonLang, lessonVersion]);

  const renderAccessibilityStatus = (label: string, status: AccessibilityStatus) => {
    const colors = {
      'Excelente': 'text-green-400 bg-green-500/10 border-green-500/20',
      'Bueno': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      'Mejorable': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      'Crítico': 'text-red-400 bg-red-500/10 border-red-500/20',
    };
    return (
      <div className="flex justify-between items-center text-[10px] p-1 border-b border-slate-800/50 last:border-0">
        <span className="text-slate-500">{label}</span>
        <span className={`px-1.5 py-0.5 rounded uppercase font-bold border ${colors[status]}`}>{status}</span>
      </div>
    );
  };

  // Phase 17: Enterprise Ministry Intelligence Engine Memoized
  const ministryReport = useMemo(() => {
    const data = getBibleData(lessonLang, lessonVersion);
    const challengesToAnalyze = selectedChallenges.length > 0 ? selectedChallenges : availableChallenges.slice(0, 5);
    return ministryInsightsEngine.evaluateMinistryHealth(data, challengesToAnalyze);
  }, [selectedChallenges, availableChallenges, lessonLang, lessonVersion]);

  const renderMinistryStatus = (label: string, status: MinistryStatus) => {
    const colors = {
      'Excelente': 'text-green-400 bg-green-500/10 border-green-500/20',
      'Saludable': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      'En Observación': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      'Requiere Intervención': 'text-red-400 bg-red-500/10 border-red-500/20',
    };
    return (
      <div className="flex justify-between items-center text-[10px] p-1 border-b border-slate-800/50 last:border-0">
        <span className="text-slate-500">{label}</span>
        <span className={`px-1.5 py-0.5 rounded uppercase font-bold border ${colors[status]}`}>{status}</span>
      </div>
    );
  };

  // Phase 18: Enterprise Knowledge Graph Engine Memoized
  const semanticReport = useMemo(() => {
    const data = getBibleData(lessonLang, lessonVersion);
    return knowledgeGraphEngine.getSemanticReport(data);
  }, [lessonLang, lessonVersion]);

  const renderSemanticStatus = (label: string, status: SemanticStatus) => {
    const colors = {
      'Excelente': 'text-green-400 bg-green-500/10 border-green-500/20',
      'Bueno': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      'Mejorable': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      'Crítico': 'text-red-400 bg-red-500/10 border-red-500/20',
    };
    return (
      <div className="flex justify-between items-center text-[10px] p-1 border-b border-slate-800/50 last:border-0">
        <span className="text-slate-500">{label}</span>
        <span className={`px-1.5 py-0.5 rounded uppercase font-bold border ${colors[status]}`}>{status}</span>
      </div>
    );
  };

  // Phase 19: Enterprise Digital Twin & Simulation Engine Memoized
  const simulationReport = useMemo(() => {
    const data = getBibleData(lessonLang, lessonVersion);
    const challengesToAnalyze = selectedChallenges.length > 0 ? selectedChallenges : availableChallenges.slice(0, 5);
    return simulationEngine.simulateLesson(data, challengesToAnalyze);
  }, [selectedChallenges, availableChallenges, lessonLang, lessonVersion]);

  const renderSimulationStatus = (label: string, status: SimulationStatus) => {
    const colors = {
      'Excelente': 'text-green-400 bg-green-500/10 border-green-500/20',
      'Bueno': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      'Mejorable': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      'Crítico': 'text-red-400 bg-red-500/10 border-red-500/20',
    };
    return (
      <div className="flex justify-between items-center text-[10px] p-1 border-b border-slate-800/50 last:border-0">
        <span className="text-slate-500">{label}</span>
        <span className={`px-1.5 py-0.5 rounded uppercase font-bold border ${colors[status]}`}>{status}</span>
      </div>
    );
  };

  // Phase 20: Enterprise Release Candidate Memoized
  const platformHealth = useMemo(() => {
    const data = getBibleData(lessonLang, lessonVersion);
    const challengesToAnalyze = selectedChallenges.length > 0 ? selectedChallenges : availableChallenges.slice(0, 5);
    return platformHealthEngine.auditPlatform(data, challengesToAnalyze);
  }, [selectedChallenges, availableChallenges, lessonLang, lessonVersion]);

  const renderHealthStatus = (label: string, status: HealthStatus) => {
    const colors = {
      'Excelente': 'text-green-400 bg-green-500/10 border-green-500/20',
      'Bueno': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      'Mejorable': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      'Crítico': 'text-red-400 bg-red-500/10 border-red-500/20',
    };
    return (
      <div className="flex justify-between items-center text-[10px] p-1 border-b border-slate-800/50 last:border-0">
        <span className="text-slate-500">{label}</span>
        <span className={`px-1.5 py-0.5 rounded uppercase font-bold border ${colors[status]}`}>{status}</span>
      </div>
    );
  };

  const toggleChallengeSelection = (item: any) => {
    playSound('click');
    const isSelected = selectedChallenges.some(
      c => (c.answer && c.answer === item.answer) || 
           (c.fullPhrase && c.fullPhrase === item.fullPhrase) || 
           (c.phrase && c.phrase === item.phrase)
    );

    if (isSelected) {
      setSelectedChallenges(selectedChallenges.filter(
        c => !((c.answer && c.answer === item.answer) || 
               (c.fullPhrase && c.fullPhrase === item.fullPhrase) || 
               (c.phrase && c.phrase === item.phrase))
      ));
    } else {
      if (selectedChallenges.length >= 5) {
        // Limit to 5 challenges
        return;
      }
      setSelectedChallenges([...selectedChallenges, item]);
    }
  };

  const generateLessonLink = () => {
    playSound('correct');
    
    // Construct Lesson Config
    const lessonConfig = {
      lessonName: lessonName || (lessonLang === 'es' ? 'Lección Bíblica' : 'Bible Lesson'),
      difficulty: lessonDifficulty,
      bibleVersion: lessonVersion,
      language: lessonLang,
      doctrinalProfile: lessonDoctrinalProfile === 'universal' ? undefined : lessonDoctrinalProfile,
      challenges: selectedChallenges.length > 0 ? selectedChallenges : availableChallenges.slice(0, 5),
      reflectionQuestion: reflectionQuestion || (lessonLang === 'es' ? '¿Qué aprendiste de esta lección?' : 'What did you learn from this lesson?')
    };

    // Serialize and encode Base64
    const jsonString = JSON.stringify(lessonConfig);
    const base64Code = btoa(unescape(encodeURIComponent(jsonString)));
    
    // Generate URL
    const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
    const shareUrl = `${baseUrl}/game?lesson=${base64Code}`;
    setGeneratedUrl(shareUrl);
    setCopied(false);
  };

  const handleCopy = () => {
    playSound('click');
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    playSound('click');
    const message = lessonLang === 'es' 
      ? `Hola alumnos, aquí está la tarea bíblica: "${lessonName || 'Lección'}". Haz clic en el enlace para realizar la actividad y completar tu reflexión: ${generatedUrl}`
      : `Hello students, here is the Bible assignment: "${lessonName || 'Lesson'}". Click the link to complete the activity and write your reflection: ${generatedUrl}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBack = () => {
    playSound('click');
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Button onClick={handleBack} variant="ghost" size="sm" className="text-slate-400 hover:text-white flex items-center gap-1">
          <ArrowLeft className="h-5 w-5" />
          {t.game.back_to_menu}
        </Button>
      </div>

      <main className="flex flex-col items-center justify-center w-full max-w-2xl animate-fade-in z-10 mt-14 mb-8">
        <Card className="w-full bg-slate-900/80 backdrop-blur-md border-primary/30 shadow-2xl rounded-3xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />
          
          <CardHeader className="pt-6 pb-2 text-center">
            <div className="flex justify-center items-center gap-3 mb-2">
              <InstitutionalLogo className="w-14 h-14" />
              <div className="text-left">
                <CardTitle className="font-headline text-2xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-yellow-500 flex items-center gap-1.5">
                  <School className="w-6 h-6 text-amber-400" />
                  {t.classroom.title}
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs mt-0.5">
                  {lessonLang === 'es' ? 'Herramienta de Lecciones Virtuales para Ministros y Educadores' : 'Virtual Lesson Tool for Ministers and Educators'}
                </CardDescription>
              </div>
            </div>
            <div className="border-b border-slate-800 w-3/4 mx-auto my-2"></div>
            <p className="text-slate-300 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
              {t.classroom.description}
            </p>
          </CardHeader>

          <CardContent className="space-y-5 p-6">
            {/* Lesson details form */}
            <div className="space-y-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              {/* Lesson Name */}
              <div className="space-y-1.5">
                <Label htmlFor="lesson-name" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.classroom.lesson_name}
                </Label>
                <Input
                  id="lesson-name"
                  value={lessonName}
                  onChange={(e) => setLessonName(e.target.value)}
                  placeholder={t.classroom.lesson_name_placeholder}
                  className="bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50"
                />
              </div>

              {/* Language & Bible Version selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t.setup.language}
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setLessonLang('es')}
                      variant={lessonLang === 'es' ? 'default' : 'outline'}
                      className={`flex-grow border-slate-800 ${lessonLang === 'es' ? 'bg-amber-500 text-slate-950 hover:bg-amber-600 font-bold' : 'text-slate-400'}`}
                      size="sm"
                    >
                      Español
                    </Button>
                    <Button
                      onClick={() => setLessonLang('en')}
                      variant={lessonLang === 'en' ? 'default' : 'outline'}
                      className={`flex-grow border-slate-800 ${lessonLang === 'en' ? 'bg-amber-500 text-slate-950 hover:bg-amber-600 font-bold' : 'text-slate-400'}`}
                      size="sm"
                    >
                      English
                    </Button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t.setup.bible_version}
                  </Label>
                  <div className="flex flex-col gap-2">
                    {lessonLang === 'es' ? (
                      <>
                        <Button
                          onClick={() => setLessonVersion('rvr1960')}
                          variant={lessonVersion === 'rvr1960' ? 'default' : 'outline'}
                          className={`justify-start border-slate-800 text-left px-3 py-2.5 h-auto text-xs ${lessonVersion === 'rvr1960' ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600' : 'text-slate-400'}`}
                          size="sm"
                        >
                          Reina-Valera 1960 (No requiere Internet)
                        </Button>
                        <Button
                          onClick={() => setLessonVersion('nvi')}
                          variant={lessonVersion === 'nvi' ? 'default' : 'outline'}
                          className={`justify-start border-slate-800 text-left px-3 py-2.5 h-auto text-xs ${lessonVersion === 'nvi' ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600' : 'text-slate-400'}`}
                          size="sm"
                        >
                          Nueva Versión Internacional (No requiere Internet)
                        </Button>
                        <Button
                          onClick={() => setLessonVersion('ntv')}
                          variant={lessonVersion === 'ntv' ? 'default' : 'outline'}
                          className={`justify-start border-slate-800 text-left px-3 py-2.5 h-auto text-xs ${lessonVersion === 'ntv' ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600' : 'text-slate-400'}`}
                          size="sm"
                        >
                          Nueva Traducción Viviente (No requiere Internet)
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => setLessonVersion('kjv')}
                          variant={lessonVersion === 'kjv' ? 'default' : 'outline'}
                          className={`justify-start border-slate-800 text-left px-3 py-2.5 h-auto text-xs ${lessonVersion === 'kjv' ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600' : 'text-slate-400'}`}
                          size="sm"
                        >
                          King James Version (No Internet required)
                        </Button>
                        <Button
                          onClick={() => setLessonVersion('niv')}
                          variant={lessonVersion === 'niv' ? 'default' : 'outline'}
                          className={`justify-start border-slate-800 text-left px-3 py-2.5 h-auto text-xs ${lessonVersion === 'niv' ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600' : 'text-slate-400'}`}
                          size="sm"
                        >
                          New International Version (No Internet required)
                        </Button>
                        <Button
                          onClick={() => setLessonVersion('esv')}
                          variant={lessonVersion === 'esv' ? 'default' : 'outline'}
                          className={`justify-start border-slate-800 text-left px-3 py-2.5 h-auto text-xs ${lessonVersion === 'esv' ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600' : 'text-slate-400'}`}
                          size="sm"
                        >
                          English Standard Version (No Internet required)
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Game Mode */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.setup.mode_title}
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={() => setLessonMode('find-word')}
                    variant={lessonMode === 'find-word' ? 'default' : 'outline'}
                    className={`flex-grow border-slate-800 text-xs ${lessonMode === 'find-word' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                    size="sm"
                  >
                    {t.setup.mode_find_word}
                  </Button>
                  <Button
                    onClick={() => setLessonMode('complete-phrase')}
                    variant={lessonMode === 'complete-phrase' ? 'default' : 'outline'}
                    className={`flex-grow border-slate-800 text-xs ${lessonMode === 'complete-phrase' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                    size="sm"
                  >
                    {t.setup.mode_complete_phrase}
                  </Button>
                  <Button
                    onClick={() => setLessonMode('guess-the-phrase')}
                    variant={lessonMode === 'guess-the-phrase' ? 'default' : 'outline'}
                    className={`flex-grow border-slate-800 text-xs ${lessonMode === 'guess-the-phrase' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                    size="sm"
                  >
                    {t.setup.mode_guess_phrase}
                  </Button>
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  {t.classroom.select_level}
                </Label>
                <RadioGroup defaultValue={lessonDifficulty} onValueChange={setLessonDifficulty as any} className="grid grid-cols-3 gap-3">
                  <div>
                      <RadioGroupItem value="principiante" id="p_diff" className="sr-only" />
                      <Label htmlFor="p_diff" className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 min-h-[60px] cursor-pointer text-center text-xs transition-all duration-300 ${lessonDifficulty === 'principiante' ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold' : 'border-slate-800 bg-slate-950/40 text-slate-400'}`}>
                          {t.setup.diff_beginner}
                      </Label>
                  </div>
                  <div>
                      <RadioGroupItem value="discipulo" id="d_diff" className="sr-only" />
                      <Label htmlFor="d_diff" className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 min-h-[60px] cursor-pointer text-center text-xs transition-all duration-300 ${lessonDifficulty === 'discipulo' ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold' : 'border-slate-800 bg-slate-950/40 text-slate-400'}`}>
                          {t.setup.diff_disciple}
                      </Label>
                  </div>
                  <div>
                      <RadioGroupItem value="avanzado" id="e_diff" className="sr-only" />
                      <Label htmlFor="e_diff" className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 min-h-[60px] cursor-pointer text-center text-xs transition-all duration-300 ${lessonDifficulty === 'avanzado' ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold' : 'border-slate-800 bg-slate-950/40 text-slate-400'}`}>
                          {t.setup.diff_expert}
                      </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Doctrinal Profile */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'es' ? 'Perfil Doctrinal' : 'Doctrinal Profile'}
                </Label>
                <Select value={lessonDoctrinalProfile} onValueChange={(val: string) => { playSound('click'); setLessonDoctrinalProfile(val); }}>
                  <SelectTrigger className="w-full bg-slate-950 border-slate-800 text-sm text-amber-300 h-10 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                    <SelectItem value="universal" className="focus:bg-amber-500 focus:text-slate-950 text-sm">{language === 'es' ? 'Universal (Todas)' : 'Universal (All)'}</SelectItem>
                    <SelectItem value="evangelico" className="focus:bg-amber-500 focus:text-slate-950 text-sm">{language === 'es' ? 'Evangélico' : 'Evangelical'}</SelectItem>
                    <SelectItem value="catolico" className="focus:bg-amber-500 focus:text-slate-950 text-sm">{language === 'es' ? 'Católico' : 'Catholic'}</SelectItem>
                    <SelectItem value="adventista" className="focus:bg-amber-500 focus:text-slate-950 text-sm">{language === 'es' ? 'Adventista' : 'Adventist'}</SelectItem>
                    <SelectItem value="bautista" className="focus:bg-amber-500 focus:text-slate-950 text-sm">{language === 'es' ? 'Bautista' : 'Baptist'}</SelectItem>
                    <SelectItem value="pentecostal" className="focus:bg-amber-500 focus:text-slate-950 text-sm">{language === 'es' ? 'Pentecostal' : 'Pentecostal'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reflection Question */}
              <div className="space-y-1.5">
                <Label htmlFor="reflection-question" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.classroom.reflection_question}
                </Label>
                <Input
                  id="reflection-question"
                  value={reflectionQuestion}
                  onChange={(e) => setReflectionQuestion(e.target.value)}
                  placeholder={t.classroom.reflection_placeholder}
                  className="bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50"
                />
              </div>
            </div>

            {/* Challenges Selector (Limit to 5) */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex justify-between items-center">
                <span>{t.classroom.select_challenges}</span>
                <span className="text-amber-400 font-mono">({selectedChallenges.length}/5)</span>
              </Label>
              <div className="max-h-52 overflow-y-auto border border-slate-800 rounded-2xl bg-slate-950/80 p-2 space-y-1.5 pr-2">
                {availableChallenges.map((item: any, idx: number) => {
                  const labelText = item.fullPhrase || item.phrase || item.answer;
                  const reference = item.reference ? ` (${item.reference})` : '';
                  const isSelected = selectedChallenges.some(
                    c => (c.answer && c.answer === item.answer) || 
                         (c.fullPhrase && c.fullPhrase === item.fullPhrase) || 
                         (c.phrase && c.phrase === item.phrase)
                  );

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleChallengeSelection(item)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${isSelected ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'}`}
                    >
                      <span className="truncate max-w-[85%]">{labelText}{reference}</span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-600 shrink-0 ml-2 hover:text-slate-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Phase 10: Teacher Insights Panel */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-sky-400" />
                {language === 'es' ? 'Análisis Pedagógico de la Lección' : 'Lesson Pedagogical Analysis'}
              </Label>
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  {renderStatus(language === 'es' ? 'Diversidad de Temas' : 'Themes Diversity', teacherInsights.themeBalance)}
                  {renderStatus(language === 'es' ? 'Equilibrio de Dificultad' : 'Difficulty Balance', teacherInsights.difficultyBalance)}
                  {renderStatus(language === 'es' ? 'Niveles de Pensamiento (Bloom)' : 'Bloom Levels', teacherInsights.bloomBalance)}
                  {renderStatus(language === 'es' ? 'Equilibrio Antiguo/Nuevo Testamento' : 'AT/NT Balance', teacherInsights.doctrinalBalance)}
                  {renderStatus(language === 'es' ? 'Cobertura Bíblica' : 'Biblical Coverage', teacherInsights.biblicalCoverage)}
                </div>
                {teacherInsights.recommendations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-1 text-left">
                    <span className="text-[10px] text-amber-400 font-bold uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {language === 'es' ? 'Sugerencias Automáticas' : 'Automated Suggestions'}
                    </span>
                    <ul className="text-xs text-slate-400 list-disc pl-4 space-y-1">
                      {teacherInsights.recommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Phase 12: Enterprise QA Audit Panel */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                {language === 'es' ? 'Auditoría del Sistema (QA)' : 'System Audit (QA)'}
              </Label>
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
                  {renderAuditStatus('Arquitectura', systemAudit.architecture)}
                  {renderAuditStatus('Consistencia Datos', systemAudit.dataConsistency)}
                  {renderAuditStatus('Cobertura Doctrinal', systemAudit.doctrinalCoverage)}
                  {renderAuditStatus('Cobertura Pedagógica', systemAudit.pedagogicalCoverage)}
                  {renderAuditStatus('Accesibilidad', systemAudit.accessibility)}
                  {renderAuditStatus('Local-First', systemAudit.localFirstCompatibility)}
                </div>
                {systemAudit.details.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <ul className="text-[9px] text-slate-500 list-disc pl-4 space-y-0.5">
                      {systemAudit.details.map((detail: string, i: number) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Phase 13: Enterprise Content Governance Panel */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-slate-500" />
                {language === 'es' ? 'Gobierno del Contenido (Editorial)' : 'Content Governance (Editorial)'}
              </Label>
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
                  {renderGovernanceStatus('Libros Bíblicos', contentGovernance.bookCoverage)}
                  {renderGovernanceStatus('Testamentos', contentGovernance.testamentCoverage)}
                  {renderGovernanceStatus('Temáticas', contentGovernance.themeCoverage)}
                  {renderGovernanceStatus('Niveles Bloom', contentGovernance.bloomCoverage)}
                  {renderGovernanceStatus('Dificultades', contentGovernance.difficultyBalance)}
                  {renderGovernanceStatus('Redundancias', contentGovernance.redundancyCheck)}
                  {renderGovernanceStatus('Vocabulario', contentGovernance.vocabularyAppropriateness)}
                </div>
                {contentGovernance.editorialRecommendations.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <ul className="text-[9px] text-amber-500/80 list-disc pl-4 space-y-0.5">
                      {contentGovernance.editorialRecommendations.map((detail: string, i: number) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Phase 14: Enterprise Curriculum Engine Panel */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Route className="w-3.5 h-3.5 text-slate-500" />
                {language === 'es' ? 'Planificación Curricular' : 'Curriculum Planning'}
              </Label>
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-3 gap-y-1">
                  {renderCurriculumStatus('Cobertura Curricular', curriculumPlan.curricularCoverage)}
                  {renderCurriculumStatus('Progresión Pedagógica', curriculumPlan.pedagogicalProgression)}
                  {renderCurriculumStatus('Equilibrio de Dificultad', curriculumPlan.difficultyBalance)}
                  {renderCurriculumStatus('Equilibrio Bloom', curriculumPlan.bloomBalance)}
                </div>
                {curriculumPlan.learningObjectives.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <span className="text-[9px] text-sky-400 font-bold uppercase block">Objetivos de Aprendizaje</span>
                    <ul className="text-[9px] text-slate-400 list-disc pl-4 space-y-0.5">
                      {curriculumPlan.learningObjectives.map((obj: string, i: number) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {curriculumPlan.recommendedSequence.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <span className="text-[9px] text-amber-400 font-bold uppercase block">Secuencia Recomendada</span>
                    <ul className="text-[9px] text-slate-400 list-none space-y-0.5">
                      {curriculumPlan.recommendedSequence.map((seq: string, i: number) => (
                        <li key={i} className="bg-slate-900/50 px-1.5 py-0.5 rounded text-slate-300">{seq}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Phase 15: Enterprise Assessment Engine Panel */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                {language === 'es' ? 'Evaluación del Aprendizaje' : 'Learning Assessment'}
              </Label>
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-3 gap-y-1">
                  {renderAssessmentStatus('Aprendizaje Alcanzado', assessmentReport.learningAchieved)}
                  {renderAssessmentStatus('Retención a Corto Plazo', assessmentReport.retention)}
                  {renderAssessmentStatus('Comprensión Teórica', assessmentReport.comprehension)}
                  {renderAssessmentStatus('Aplicación Práctica', assessmentReport.application)}
                  {renderAssessmentStatus('Progreso por Dificultad', assessmentReport.progressByDifficulty)}
                </div>
                {assessmentReport.strengths.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <span className="text-[9px] text-green-400 font-bold uppercase block">Fortalezas Destacadas</span>
                    <ul className="text-[9px] text-slate-400 list-disc pl-4 space-y-0.5">
                      {assessmentReport.strengths.map((str: string, i: number) => (
                        <li key={i}>{str}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {assessmentReport.recommendationsForTeacher.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <span className="text-[9px] text-amber-400 font-bold uppercase block">Recomendaciones Docentes</span>
                    <ul className="text-[9px] text-slate-400 list-disc pl-4 space-y-0.5">
                      {assessmentReport.recommendationsForTeacher.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Phase 16: Enterprise Accessibility Engine Panel */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                {language === 'es' ? 'Accesibilidad e Inclusión' : 'Accessibility & Inclusion'}
              </Label>
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
                  {renderAccessibilityStatus('Accesibilidad General', accessibilityReport.overallAccessibility)}
                  {renderAccessibilityStatus('Inclusión Intergeneracional', accessibilityReport.overallInclusion)}
                  {renderAccessibilityStatus('Carga Cognitiva', accessibilityReport.cognitiveLoad)}
                  {renderAccessibilityStatus('Consistencia Visual', accessibilityReport.visualConsistency)}
                  {renderAccessibilityStatus('Tiempos de Respuesta', accessibilityReport.responseTimes)}
                  {renderAccessibilityStatus('Navegación / UI', accessibilityReport.navigation)}
                </div>
                {accessibilityReport.recommendationsUX.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <span className="text-[9px] text-sky-400 font-bold uppercase block">Sugerencias UX</span>
                    <ul className="text-[9px] text-slate-400 list-disc pl-4 space-y-0.5">
                      {accessibilityReport.recommendationsUX.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                  <span className="text-[9px] text-amber-400 font-bold uppercase block">Público Objetivo Recomendado</span>
                  <p className="text-[9px] text-slate-400 italic">Niños: {accessibilityReport.targetAudienceRecommendations.kids}</p>
                  <p className="text-[9px] text-slate-400 italic">Adultos Mayores: {accessibilityReport.targetAudienceRecommendations.seniors}</p>
                </div>
              </div>
            </div>

            {/* Phase 17: Enterprise Ministry Intelligence Engine Panel */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Church className="w-3.5 h-3.5 text-slate-500" />
                {language === 'es' ? 'Inteligencia Ministerial' : 'Ministry Intelligence'}
              </Label>
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-3 gap-y-1">
                  {renderMinistryStatus('Salud del Ministerio Educativo', ministryReport.overallHealth)}
                  {renderMinistryStatus('Cobertura Bíblica', ministryReport.biblicalCoverage)}
                  {renderMinistryStatus('Cobertura Pedagógica', ministryReport.pedagogicalCoverage)}
                  {renderMinistryStatus('Diversidad de Contenido', ministryReport.contentDiversity)}
                  {renderMinistryStatus('Equilibrio Curricular', ministryReport.curricularBalance)}
                </div>
                {ministryReport.risksDetected.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <span className="text-[9px] text-red-400 font-bold uppercase block">Riesgos Detectados</span>
                    <ul className="text-[9px] text-slate-400 list-disc pl-4 space-y-0.5">
                      {ministryReport.risksDetected.map((risk: string, i: number) => (
                        <li key={i}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {ministryReport.priorityRecommendations.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <span className="text-[9px] text-amber-400 font-bold uppercase block">Recomendaciones Prioritarias</span>
                    <ul className="text-[9px] text-slate-400 list-disc pl-4 space-y-0.5">
                      {ministryReport.priorityRecommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                  <span className="text-[9px] text-sky-400 font-bold uppercase block">Recomendaciones por Rol</span>
                  <p className="text-[9px] text-slate-400 italic">Maestro: {ministryReport.roleRecommendations.teacher}</p>
                  <p className="text-[9px] text-slate-400 italic">Dir. Escuela Dominical: {ministryReport.roleRecommendations.sundaySchoolDirector}</p>
                </div>
              </div>
            </div>

            {/* Phase 18: Enterprise Knowledge Graph Engine Panel */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Waypoints className="w-3.5 h-3.5 text-slate-500" />
                {language === 'es' ? 'Grafo Semántico' : 'Knowledge Graph'}
              </Label>
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-3 gap-y-1">
                  {renderSemanticStatus('Cobertura Semántica', semanticReport.semanticCoverage)}
                  <div className="flex justify-between items-center text-[10px] p-1 border-b border-slate-800/50 last:border-0">
                    <span className="text-slate-500">Nodos Totales</span>
                    <span className="px-1.5 py-0.5 text-slate-300 font-mono font-bold">{semanticReport.nodesCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] p-1 border-b border-slate-800/50 last:border-0">
                    <span className="text-slate-500">Relaciones (Edges)</span>
                    <span className="px-1.5 py-0.5 text-slate-300 font-mono font-bold">{semanticReport.edgesCount}</span>
                  </div>
                </div>
                {semanticReport.topConnectedNodes.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <span className="text-[9px] text-sky-400 font-bold uppercase block">Contenidos Más Conectados</span>
                    <ul className="text-[9px] text-slate-400 list-none flex flex-wrap gap-1">
                      {semanticReport.topConnectedNodes.map((node: string, i: number) => (
                        <li key={i} className="bg-slate-900/50 px-1.5 py-0.5 rounded border border-slate-800/50 text-slate-300">{node}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {semanticReport.editorialRecommendations.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <span className="text-[9px] text-amber-400 font-bold uppercase block">Recomendaciones Editoriales Semánticas</span>
                    <ul className="text-[9px] text-slate-400 list-disc pl-4 space-y-0.5">
                      {semanticReport.editorialRecommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Phase 19: Enterprise Digital Twin & Simulation Engine Panel */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-slate-500" />
                {language === 'es' ? 'Simulación de Lección (Digital Twin)' : 'Lesson Simulation'}
              </Label>
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-3 gap-y-1">
                  {renderSimulationStatus('Simulación General', simulationReport.overallSimulation)}
                  {renderSimulationStatus('Cobertura Pedagógica', simulationReport.pedagogicalCoverage)}
                  {renderSimulationStatus('Cobertura Doctrinal', simulationReport.doctrinalCoverage)}
                  {renderSimulationStatus('Cobertura Semántica', simulationReport.semanticCoverage)}
                  <div className="flex justify-between items-center text-[10px] p-1 border-b border-slate-800/50 last:border-0">
                    <span className="text-slate-500">Tiempo Estimado</span>
                    <span className="px-1.5 py-0.5 text-slate-300 font-mono font-bold">~{simulationReport.estimatedTimeMinutes} min</span>
                  </div>
                </div>
                {simulationReport.risksDetected.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <span className="text-[9px] text-red-400 font-bold uppercase block">Riesgos Detectados</span>
                    <ul className="text-[9px] text-slate-400 list-disc pl-4 space-y-0.5">
                      {simulationReport.risksDetected.map((risk: string, i: number) => (
                        <li key={i}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {simulationReport.prePublicationRecommendations.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <span className="text-[9px] text-amber-400 font-bold uppercase block">Recomendaciones Pre-Publicación</span>
                    <ul className="text-[9px] text-slate-400 list-disc pl-4 space-y-0.5">
                      {simulationReport.prePublicationRecommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Phase 20: Enterprise Release Candidate Panel */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                {language === 'es' ? 'Estado General de la Plataforma' : 'Overall Platform Status'}
              </Label>
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-3 gap-y-1">
                  {renderHealthStatus('Salud Arquitectónica', platformHealth.architecturalHealth)}
                  {renderHealthStatus('Salud Pedagógica', platformHealth.pedagogicalHealth)}
                  {renderHealthStatus('Salud Doctrinal', platformHealth.doctrinalHealth)}
                  {renderHealthStatus('Salud del Contenido', platformHealth.contentHealth)}
                  {renderHealthStatus('Salud del Currículum', platformHealth.curriculumHealth)}
                  {renderHealthStatus('Salud de Accesibilidad', platformHealth.accessibilityHealth)}
                  {renderHealthStatus('Salud del Ministerio', platformHealth.ministryHealth)}
                  {renderHealthStatus('Salud del Grafo de Conocimiento', platformHealth.knowledgeGraphHealth)}
                  {renderHealthStatus('Salud de las Simulaciones', platformHealth.simulationHealth)}
                  {renderHealthStatus('Estado General Enterprise', platformHealth.overallEnterpriseStatus)}
                </div>
                {platformHealth.developerRecommendations.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50 space-y-1 text-left">
                    <span className="text-[9px] text-green-400 font-bold uppercase block">Recomendaciones para Desarrolladores</span>
                    <ul className="text-[9px] text-slate-400 list-disc pl-4 space-y-0.5">
                      {platformHealth.developerRecommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={generateLessonLink}
              size="lg"
              className="w-full font-bold text-slate-950 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 rounded-2xl py-6"
            >
              {t.classroom.generate_link}
            </Button>

            {/* Generated Share Drawer */}
            {generatedUrl && (
              <div className="space-y-3 p-4 bg-slate-950 border border-slate-800 rounded-2xl animate-fade-in">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  {t.classroom.link_generated}
                </h4>
                
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={generatedUrl}
                    className="bg-slate-900 border-slate-800 text-slate-400 text-xs select-all"
                  />
                  <Button onClick={handleCopy} size="icon" variant="outline" className="border-slate-800 text-slate-400 hover:text-white shrink-0">
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <Button
                  onClick={handleShareWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 py-4"
                >
                  <Share2 className="w-4 h-4" />
                  {t.classroom.share_whatsapp}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

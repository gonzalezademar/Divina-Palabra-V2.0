export interface EducationalPlugin {
  id: string;
  name: string;
  version: string;
  description: string;
  capabilities: string[];
  estado: 'active' | 'inactive';
  origin: string;
  compatibility: string;
  
  onGameStart?: (payload: any) => void | Promise<void>;
  onGameEnd?: (payload: any) => void | Promise<void>;
  onCorrectAnswer?: (payload: any) => void | Promise<void>;
  onIncorrectAnswer?: (payload: any) => void | Promise<void>;
  
  onLoadChallenges?: (challenges: any[], metadata: any) => any[] | Promise<any[]>;
  onGenerateReports?: (sessionData: any) => any | Promise<any>;
  onRecommendations?: (analytics: any) => any | Promise<any>;
  onTeacherDashboard?: (data: any) => any | Promise<any>;
  onSync?: (syncData: any) => void | Promise<void>;
}

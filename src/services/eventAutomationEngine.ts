import { eventBus } from './eventBus';
import { pluginManager } from '../plugins/PluginManager';
import { telemetryEngine } from './telemetryEngine';
import { performanceMonitor } from './performanceMonitor';
import { diagnosticDashboard } from './diagnosticDashboard';
import { educationalAnalyticsEngine } from './educationalAnalyticsEngine';
import { learningEngine } from './learningEngine';
import { adaptiveLearningEngine } from './adaptiveLearningEngine';
import { teacherInsightsEngine } from './teacherInsightsEngine';
import { assessmentEngine } from './assessmentEngine';
import { contentQualityEngine } from './contentQualityEngine';
import { educationalOrchestrator } from './educationalOrchestrator';
import { featureFlagEngine } from './featureFlagEngine';
import { workflowEngine } from '../workflows/WorkflowEngine';
import { aiManager } from '../ai/AIManager';
import { digitalTwinEngine } from '../digitalTwin/DigitalTwinEngine';
import { OperationsFacade } from '../operations/OperationsFacade';

export type EventType = 
  | 'GAME_STARTED'
  | 'GAME_FINISHED'
  | 'QUESTION_LOADED'
  | 'QUESTION_ANSWERED'
  | 'CORRECT_ANSWER'
  | 'WRONG_ANSWER'
  | 'PLAYER_LEVEL_UP'
  | 'ACHIEVEMENT_UNLOCKED'
  | 'LESSON_CREATED'
  | 'LESSON_STARTED'
  | 'LESSON_FINISHED'
  | 'SYNC_COMPLETED'
  | 'SYNC_FAILED'
  | 'PLUGIN_EXECUTED'
  | 'PLUGIN_FAILED'
  | 'ANALYTICS_GENERATED'
  | 'ASSESSMENT_COMPLETED'
  | 'REPORT_GENERATED';

export interface EventRule {
  id: string;
  nombre: string;
  evento: string; // Changed to string to accept EnterpriseEvent
  condición: (payload: any) => boolean;
  acción: (payload: any) => void | Promise<void>;
  prioridad: number;
  habilitada: boolean;
  origen: string;
}

export class EventAutomationEngine {
  private static instance: EventAutomationEngine;
  private rules: EventRule[] = [];
  private isInitialized = false;

  private stats = { ejecutadas: 0, errores: 0 };

  private constructor() {
    this.registerDefaultRules();
  }

  static getInstance(): EventAutomationEngine {
    if (!EventAutomationEngine.instance) {
      EventAutomationEngine.instance = new EventAutomationEngine();
    }
    return EventAutomationEngine.instance;
  }

  public getStatistics() {
    return {
      registered: this.rules.length,
      active: this.rules.filter(r => r.habilitada).length,
      executed: this.stats.ejecutadas,
      errors: this.stats.errores
    };
  }

  public getRules() {
    return this.rules;
  }

  public registerRule(rule: EventRule): void {
    const existingIndex = this.rules.findIndex(r => r.id === rule.id);
    if (existingIndex !== -1) {
      this.rules[existingIndex] = rule;
    } else {
      this.rules.push(rule);
    }
    this.sortRules();
  }

  public enableRule(id: string): void {
    const rule = this.rules.find(r => r.id === id);
    if (rule) {
      rule.habilitada = true;
    }
  }

  public disableRule(id: string): void {
    const rule = this.rules.find(r => r.id === id);
    if (rule) {
      rule.habilitada = false;
    }
  }

  public removeRule(id: string): void {
    this.rules = this.rules.filter(r => r.id !== id);
  }

  private sortRules() {
    this.rules.sort((a, b) => b.prioridad - a.prioridad);
  }

  public async evaluateEvent(eventName: string, payload: any): Promise<void> {
    const applicableRules = this.rules.filter(
      r => r.habilitada && r.evento === eventName && r.condición(payload)
    );
    for (const rule of applicableRules) {
      try {
        await rule.acción(payload);
        this.stats.ejecutadas++;
      } catch (e) {
        console.error(`Error executing rule ${rule.id} for event ${eventName}:`, e);
        this.stats.errores++;
      }
    }
  }

  private initializeListener() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    
    const allEvents: EventType[] = [
      'GAME_STARTED', 'GAME_FINISHED', 'QUESTION_LOADED', 'QUESTION_ANSWERED',
      'CORRECT_ANSWER', 'WRONG_ANSWER', 'PLAYER_LEVEL_UP', 'ACHIEVEMENT_UNLOCKED',
      'LESSON_CREATED', 'LESSON_STARTED', 'LESSON_FINISHED', 'SYNC_COMPLETED',
      'SYNC_FAILED', 'PLUGIN_EXECUTED', 'PLUGIN_FAILED', 'ANALYTICS_GENERATED',
      'ASSESSMENT_COMPLETED', 'REPORT_GENERATED'
    ];

    allEvents.forEach(eventType => {
      eventBus.on(eventType, async (payload) => {
        if (!featureFlagEngine.isEnabled('ENABLE_EVENT_AUTOMATION')) return;

        const applicableRules = this.rules.filter(
          r => r.habilitada && r.evento === eventType && r.condición(payload)
        );
        for (const rule of applicableRules) {
          try {
            await rule.acción(payload);
          } catch (e) {
            console.error(`Error executing rule ${rule.id} for event ${eventType}:`, e);
          }
        }
      });
    });
  }

  private registerDefaultRules() {
    // Analytics & Telemetry Rule
    this.registerRule({
      id: 'rule_log_telemetry_game_finished',
      nombre: 'Registrar Telemetría y Analytics al finalizar juego',
      evento: 'GAME_FINISHED',
      condición: () => true,
      prioridad: 10,
      habilitada: true,
      origen: 'system',
      acción: (payload: any) => {
         // Telemetry is already hooked via eventBus, but we can do extra here
      }
    });

    this.registerRule({
      id: 'rule_update_educational_profile_correct',
      nombre: 'Actualizar perfil educativo en respuesta correcta',
      evento: 'CORRECT_ANSWER',
      condición: (payload: any) => !!payload?.challenge,
      prioridad: 20,
      habilitada: true,
      origen: 'system',
      acción: (payload: any) => {
         learningEngine.analyzeChallenge(payload.challenge);
      }
    });

    this.registerRule({
      id: 'rule_generate_assessment',
      nombre: 'Generar diagnóstico de aprendizaje en juego finalizado',
      evento: 'GAME_FINISHED',
      condición: (payload: any) => payload?.playedChallenges && payload?.totalCatalogSize,
      prioridad: 5,
      habilitada: true,
      origen: 'system',
      acción: (payload: any) => {
         assessmentEngine.generateAssessmentReport(payload.playedChallenges, payload.totalCatalogSize);
      }
    });

    this.registerRule({
      id: 'rule_dashboard_teacher_update',
      nombre: 'Actualizar dashboard docente',
      evento: 'LESSON_FINISHED',
      condición: () => true,
      prioridad: 10,
      habilitada: true,
      origen: 'system',
      acción: (payload: any) => {
         // Just a placeholder hook logic
      }
    });

    this.registerRule({
      id: 'rule_execute_plugins_on_question',
      nombre: 'Ejecutar plugins adicionales en preguntas',
      evento: 'QUESTION_ANSWERED',
      condición: () => true,
      prioridad: 10,
      habilitada: true,
      origen: 'system',
      acción: (payload: any) => {
         if (payload.isCorrect) {
             pluginManager.executeHook('onCorrectAnswer', payload);
         } else {
             pluginManager.executeHook('onIncorrectAnswer', payload);
         }
      }
    });

    // 4. WorkflowEngine rule
    this.registerRule({
      id: 'rule_trigger_workflow_on_event',
      nombre: 'Iniciar workflow automáticamente',
      evento: 'SYNC_COMPLETED',
      condición: () => true,
      prioridad: 10,
      habilitada: true,
      origen: 'system',
      acción: (payload: any) => {
         workflowEngine.execute('sync_process', payload).catch(console.error);
      }
    });

    // 5. AIManager rule
    this.registerRule({
      id: 'rule_ai_task_on_event',
      nombre: 'Ejecutar tarea AI automática',
      evento: 'ANALYTICS_GENERATED',
      condición: () => true,
      prioridad: 5,
      habilitada: true,
      origen: 'system',
      acción: (payload: any) => {
         aiManager.execute({ id: `ai_auto_${Date.now()}`, prompt: 'Auto analytics task', timestamp: Date.now() }).catch(console.error);
      }
    });

    // 6. DigitalTwinEngine rule
    this.registerRule({
      id: 'rule_digital_twin_snapshot',
      nombre: 'Registrar snapshot de Digital Twin',
      evento: 'GAME_FINISHED',
      condición: () => true,
      prioridad: 8,
      habilitada: true,
      origen: 'system',
      acción: (payload: any) => {
         digitalTwinEngine.captureSnapshot();
      }
    });

    // 7. OperationsFacade rule
    this.registerRule({
      id: 'rule_operations_diagnostics',
      nombre: 'Registrar diagnósticos en eventos críticos',
      evento: 'SYNC_FAILED',
      condición: () => true,
      prioridad: 100,
      habilitada: true,
      origen: 'system',
      acción: (payload: any) => {
         // Placeholder for OperationsFacade diagnostics
         // Assuming OperationsFacade handles errors automatically or via a method
      }
    });
  }
}

export const eventAutomationEngine = EventAutomationEngine.getInstance();

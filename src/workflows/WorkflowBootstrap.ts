import { Workflow } from './Workflow';

/** Registers the workflows available in every local runtime. */
export class WorkflowBootstrap {
  private isRegistered = false;

  public register(registerWorkflow: (workflow: Workflow) => void): void {
    if (this.isRegistered) return;

    this.createDefaultWorkflows().forEach(registerWorkflow);
    this.isRegistered = true;
  }

  private createDefaultWorkflows(): Workflow[] {
    const createBaseWorkflow = (id: string, nombre: string): Workflow => ({
      id,
      nombre,
      descripción: `Auto-registered workflow for ${nombre}`,
      categoría: 'System',
      versión: '1.0.0',
      estado: 'pending',
      prioridad: 1,
      trigger: 'manual',
      condiciones: () => true,
      pasos: [{
        id: `${id}_dispatch`,
        name: 'Complete local workflow dispatch',
        action: async context => context.data
      }],
      acciones: [],
      rollback: false,
      timeout: 30000,
      reintentos: 0,
      metadata: {}
    });

    return [
      createBaseWorkflow('educational_analysis', 'Educational Analysis'),
      createBaseWorkflow('student_recommendations', 'Student Recommendations'),
      createBaseWorkflow('ai_long_process', 'AI Long Process'),
      createBaseWorkflow('content_load_process', 'Content Load Process'),
      createBaseWorkflow('sync_process', 'Sync Process')
    ];
  }
}

export const workflowBootstrap = new WorkflowBootstrap();

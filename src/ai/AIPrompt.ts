export type PromptCategory = 
  | 'Pedagogía'
  | 'Explicación Bíblica'
  | 'Evaluación'
  | 'Recomendaciones'
  | 'Docente'
  | 'Contenido'
  | 'Tutor'
  | 'Discipulado'
  | 'Auditoría'
  | 'Accesibilidad';

export class AIPrompt {
  constructor(
    public category: PromptCategory,
    public template: string,
    public variables: string[]
  ) {}

  public build(values: Record<string, string>): string {
    let result = this.template;
    this.variables.forEach(v => {
      result = result.replace(new RegExp(`{{${v}}}`, 'g'), values[v] || '');
    });
    return result;
  }
}

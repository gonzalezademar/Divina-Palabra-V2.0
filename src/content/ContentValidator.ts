import { ContentPackage } from './ContentPackage';
import { eventBus } from '@/services/eventBus';
import { featureFlagEngine } from '@/services/featureFlagEngine';

export class ContentValidator {
  private validationErrors = 0;

  public validate(pkg: ContentPackage): string[] {
    const errors: string[] = [];
    if (!featureFlagEngine.isEnabled('ENABLE_CONTENT_QUALITY')) return errors;

    const { manifest, data } = pkg;

    if (!manifest) {
      errors.push('Manifest missing.');
    } else {
      if (!manifest.id) errors.push('Manifest ID missing.');
      if (!manifest.versión) errors.push('Manifest versión missing.');
      if (!manifest.idiomas || manifest.idiomas.length === 0) errors.push('Manifest idioma missing.');
      if (!manifest.compatibilidadMínima && !manifest.compatibilidadMáxima) errors.push('Manifest compatibilidad missing.');
    }

    if (!data) {
      errors.push('Content payload is empty.');
    } else {
      if (!data.challenges || !Array.isArray(data.challenges)) {
        errors.push('Missing or invalid challenges array.');
      } else {
        const ids = new Set();
        data.challenges.forEach((c: any) => {
          if (ids.has(c.id)) errors.push(`Duplicate challenge ID: ${c.id}`);
          ids.add(c.id);
          if (!c.libro || !c.capitulo || !c.versiculo) {
            errors.push(`Missing biblical reference in challenge ${c.id}`);
          }
        });
      }
    }

    if (errors.length > 0) {
      this.validationErrors += errors.length;
      eventBus.emit('PERFORMANCE_METRIC', { type: 'validation_errors', count: errors.length });
    }

    return errors;
  }

  public getValidationErrorsCount(): number {
    return this.validationErrors;
  }
}

export const contentValidator = new ContentValidator();

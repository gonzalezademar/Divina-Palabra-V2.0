const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'composition');
fs.mkdirSync(srcDir, { recursive: true });

const files = {
  'ApplicationComposition.ts': 'export class ApplicationComposition {}',
  'CompositionRoot.ts': 'export class CompositionRoot {}',
  'ServiceRegistry.ts': 'export class ServiceRegistry {}',
  'ModuleRegistry.ts': 'export class ModuleRegistry {}',
  'InfrastructureRegistry.ts': 'export class InfrastructureRegistry {}',
  'ApplicationRegistry.ts': 'export class ApplicationRegistry {}',
  'DomainRegistry.ts': 'export class DomainRegistry {}',
  'PluginRegistry.ts': 'export class PluginRegistry {}',
  'WorkflowRegistry.ts': 'export class WorkflowRegistry {}',
  'IntegrationRegistry.ts': 'export class IntegrationRegistry {}',
  'RuntimeRegistry.ts': 'export class RuntimeRegistry {}',
  'OperationsRegistry.ts': 'export class OperationsRegistry {}',
  'DocumentationRegistry.ts': 'export class DocumentationRegistry {}',
  'MetaRegistry.ts': 'export class MetaRegistry {}',
  'EvolutionRegistry.ts': 'export class EvolutionRegistry {}',
  'CompositionValidator.ts': 'export class CompositionValidator {}',
  'CompositionHealth.ts': 'export class CompositionHealth {}',
  'CompositionMetrics.ts': 'export class CompositionMetrics {}',
  'CompositionSnapshot.ts': 'export class CompositionSnapshot {}',
  'CompositionFacade.ts': 'export class CompositionFacade { static initialize() {} }'
};

let indexContent = '';

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, file), content);
  const name = path.basename(file, '.ts');
  indexContent += 'export * from "./' + name + '";\n';
}

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);

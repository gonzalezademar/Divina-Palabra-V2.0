const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'meta');
fs.mkdirSync(srcDir, { recursive: true });

const files = {
  'ArchitectureModel.ts': 'export class ArchitectureModel {}',
  'ArchitectureRegistry.ts': 'export class ArchitectureRegistry {}',
  'ArchitectureAnalyzer.ts': 'export class ArchitectureAnalyzer {}',
  'ArchitectureValidator.ts': 'export class ArchitectureValidator {}',
  'ArchitectureMetrics.ts': 'export class ArchitectureMetrics {}',
  'ArchitectureEvolution.ts': 'export class ArchitectureEvolution {}',
  'ArchitectureSnapshot.ts': 'export class ArchitectureSnapshot {}',
  'ArchitectureHistory.ts': 'export class ArchitectureHistory {}',
  'ArchitectureDiff.ts': 'export class ArchitectureDiff {}',
  'ArchitectureGraph.ts': 'export class ArchitectureGraph {}',
  'DependencyAnalyzer.ts': 'export class DependencyAnalyzer {}',
  'CycleDetector.ts': 'export class CycleDetector {}',
  'ModuleInspector.ts': 'export class ModuleInspector {}',
  'ServiceInspector.ts': 'export class ServiceInspector {}',
  'PluginInspector.ts': 'export class PluginInspector {}',
  'WorkflowInspector.ts': 'export class WorkflowInspector {}',
  'RepositoryInspector.ts': 'export class RepositoryInspector {}',
  'IntegrationInspector.ts': 'export class IntegrationInspector {}',
  'RuntimeInspector.ts': 'export class RuntimeInspector {}',
  'SecurityInspector.ts': 'export class SecurityInspector {}',
  'OperationsInspector.ts': 'export class OperationsInspector {}',
  'DocumentationInspector.ts': 'export class DocumentationInspector {}',
  'MetaFacade.ts': 'export class MetaFacade { static initialize() {} }'
};

let indexContent = '';

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, file), content);
  const name = path.basename(file, '.ts');
  indexContent += 'export * from "./' + name + '";\n';
}

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);

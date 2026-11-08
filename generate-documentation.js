const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'documentation');
fs.mkdirSync(srcDir, { recursive: true });

const files = {
  // Documenters
  'ArchitectureDocumenter.ts': 'export class ArchitectureDocumenter { document() { return "Architecture"; } }',
  'ApplicationDocumenter.ts': 'export class ApplicationDocumenter { document() { return "Application"; } }',
  'DomainDocumenter.ts': 'export class DomainDocumenter { document() { return "Domain"; } }',
  'InfrastructureDocumenter.ts': 'export class InfrastructureDocumenter { document() { return "Infrastructure"; } }',
  'PluginDocumenter.ts': 'export class PluginDocumenter { document() { return "Plugins"; } }',
  'WorkflowDocumenter.ts': 'export class WorkflowDocumenter { document() { return "Workflows"; } }',
  'RepositoryDocumenter.ts': 'export class RepositoryDocumenter { document() { return "Repositories"; } }',
  'OperationsDocumenter.ts': 'export class OperationsDocumenter { document() { return "Operations"; } }',
  'SecurityDocumenter.ts': 'export class SecurityDocumenter { document() { return "Security"; } }',
  'ContentDocumenter.ts': 'export class ContentDocumenter { document() { return "Content"; } }',
  'AIDocumenter.ts': 'export class AIDocumenter { document() { return "AI"; } }',
  'DependencyGraphDocumenter.ts': 'export class DependencyGraphDocumenter { document() { return "Dependency Graph"; } }',
  
  // Generators
  'SequenceDiagramGenerator.ts': 'export class SequenceDiagramGenerator { generate() { return "Sequence Diagram"; } }',
  'ClassDiagramGenerator.ts': 'export class ClassDiagramGenerator { generate() { return "Class Diagram"; } }',
  'MermaidGenerator.ts': 'export class MermaidGenerator { generate() { return "graph TD\\n A-->B"; } }',
  'PlantUMLGenerator.ts': 'export class PlantUMLGenerator { generate() { return "@startuml\\nA -> B\\n@enduml"; } }',
  'GraphvizGenerator.ts': 'export class GraphvizGenerator { generate() { return "digraph G { A -> B; }"; } }',

  // Exporters
  'MarkdownExporter.ts': 'export class MarkdownExporter { export(data: string) { return data; } }',
  'JsonExporter.ts': 'export class JsonExporter { export(data: any) { return JSON.stringify(data); } }',
  'HtmlExporter.ts': 'export class HtmlExporter { export(data: string) { return "<html><body>" + data + "</body></html>"; } }',

  // Core
  'DocumentationRegistry.ts': 'export class DocumentationRegistry { private docs = new Map(); register(key: string, doc: any) { this.docs.set(key, doc); } get(key: string) { return this.docs.get(key); } }',
  'DocumentationFacade.ts': 'export class DocumentationFacade { static generateAll() { return "All documentation"; } }',
};

let indexContent = '';

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, file), content);
  const name = path.basename(file, '.ts');
  indexContent += 'export * from "./' + name + '";\n';
}

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);

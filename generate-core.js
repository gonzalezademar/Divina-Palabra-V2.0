const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'core');
fs.mkdirSync(srcDir, { recursive: true });

const files = {
  'EnterpriseKernel.ts': 'export class EnterpriseKernel { initialize() {} }',
  'CoreRegistry.ts': 'export class CoreRegistry {}',
  'CoreLifecycle.ts': 'export class CoreLifecycle { initialize() {} start() {} stop() {} restart() {} dispose() {} healthCheck() {} }',
  'CoreInitializer.ts': 'export class CoreInitializer {}',
  'CoreBootstrap.ts': 'export class CoreBootstrap { static boot() {} }',
  'CoreConfiguration.ts': 'export class CoreConfiguration {}',
  'CoreHealth.ts': 'export class CoreHealth {}',
  'CoreMetrics.ts': 'export class CoreMetrics {}',
  'CoreDiagnostics.ts': 'export class CoreDiagnostics {}',
  'CoreEvents.ts': 'export class CoreEvents {}',
  'CoreFacade.ts': 'export class CoreFacade { static initialize() {} }'
};

let indexContent = '';

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, file), content);
  const name = path.basename(file, '.ts');
  indexContent += 'export * from "./' + name + '";\n';
}

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'platform');
fs.mkdirSync(srcDir, { recursive: true });

const files = {
  'EnterprisePlatform.ts': 'export class EnterprisePlatform {}',
  'PlatformRegistry.ts': 'export class PlatformRegistry {}',
  'PlatformBootstrap.ts': 'export class PlatformBootstrap {}',
  'PlatformLifecycle.ts': 'export class PlatformLifecycle {}',
  'PlatformConfiguration.ts': 'export class PlatformConfiguration {}',
  'PlatformContext.ts': 'export class PlatformContext {}',
  'PlatformHealth.ts': 'export class PlatformHealth {}',
  'PlatformMetrics.ts': 'export class PlatformMetrics {}',
  'PlatformDiagnostics.ts': 'export class PlatformDiagnostics {}',
  'PlatformEvents.ts': 'export class PlatformEvents {}',
  'PlatformFacade.ts': 'export class PlatformFacade { static initialize() {} }'
};

let indexContent = '';

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, file), content);
  const name = path.basename(file, '.ts');
  indexContent += 'export * from "./' + name + '";\n';
}

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'runtime');
fs.mkdirSync(srcDir, { recursive: true });

const files = {
  'RuntimeConfiguration.ts': 'export class RuntimeConfiguration {}',
  'ConfigurationRegistry.ts': 'export class ConfigurationRegistry {}',
  'ConfigurationProvider.ts': 'export class ConfigurationProvider {}',
  'ConfigurationLoader.ts': 'export class ConfigurationLoader {}',
  'ConfigurationValidator.ts': 'export class ConfigurationValidator {}',
  'ConfigurationMerger.ts': 'export class ConfigurationMerger {}',
  'ConfigurationOverrides.ts': 'export class ConfigurationOverrides {}',
  'EnvironmentResolver.ts': 'export class EnvironmentResolver {}',
  'RuntimeContext.ts': 'export class RuntimeContext {}',
  'RuntimeState.ts': 'export class RuntimeState {}',
  'RuntimeEvents.ts': 'export class RuntimeEvents {}',
  'RuntimeSnapshot.ts': 'export class RuntimeSnapshot {}',
  'RuntimeManager.ts': 'export class RuntimeManager {}',
  'RuntimeFacade.ts': 'export class RuntimeFacade { static initialize() {} }'
};

let indexContent = '';

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, file), content);
  const name = path.basename(file, '.ts');
  indexContent += 'export * from "./' + name + '";\n';
}

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);

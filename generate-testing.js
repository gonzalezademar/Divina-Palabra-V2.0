const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'testing');
const dirs = ['unit', 'integration', 'performance', 'fixtures', 'mocks', 'builders', 'assertions', 'contracts', 'reports', 'utils'];

dirs.forEach(d => fs.mkdirSync(path.join(srcDir, d), { recursive: true }));

const files = {
  // Builders
  'builders/ChallengeBuilder.ts': 'export class ChallengeBuilder { build() { return {}; } }',
  'builders/LessonBuilder.ts': 'export class LessonBuilder { build() { return {}; } }',
  'builders/PlayerBuilder.ts': 'export class PlayerBuilder { build() { return {}; } }',
  'builders/AssessmentBuilder.ts': 'export class AssessmentBuilder { build() { return {}; } }',
  'builders/AnalyticsBuilder.ts': 'export class AnalyticsBuilder { build() { return {}; } }',
  'builders/LearningProfileBuilder.ts': 'export class LearningProfileBuilder { build() { return {}; } }',
  'builders/ContentPackageBuilder.ts': 'export class ContentPackageBuilder { build() { return {}; } }',

  // Mocks
  'mocks/MockRepository.ts': 'export class MockRepository {}',
  'mocks/MockStorage.ts': 'export class MockStorage {}',
  'mocks/MockCache.ts': 'export class MockCache {}',
  'mocks/MockTelemetry.ts': 'export class MockTelemetry {}',
  'mocks/MockLogger.ts': 'export class MockLogger {}',
  'mocks/MockClock.ts': 'export class MockClock {}',
  'mocks/MockGuidGenerator.ts': 'export class MockGuidGenerator {}',
  'mocks/MockEventPublisher.ts': 'export class MockEventPublisher {}',
  'mocks/MockAIProvider.ts': 'export class MockAIProvider {}',

  // Assertions
  'assertions/EducationalAssertions.ts': 'export class EducationalAssertions { static assertValid() {} }',
  'assertions/AnalyticsAssertions.ts': 'export class AnalyticsAssertions { static assertValid() {} }',
  'assertions/AssessmentAssertions.ts': 'export class AssessmentAssertions { static assertValid() {} }',
  'assertions/DomainAssertions.ts': 'export class DomainAssertions { static assertValid() {} }',
  'assertions/RepositoryAssertions.ts': 'export class RepositoryAssertions { static assertValid() {} }',

  // Contracts
  'contracts/RepositoryContract.ts': 'export class RepositoryContract {}',
  'contracts/StorageContract.ts': 'export class StorageContract {}',
  'contracts/CacheContract.ts': 'export class CacheContract {}',
  'contracts/AIContract.ts': 'export class AIContract {}',
  'contracts/PluginContract.ts': 'export class PluginContract {}',
  'contracts/WorkflowContract.ts': 'export class WorkflowContract {}',

  // Utils
  'utils/RandomDataGenerator.ts': 'export class RandomDataGenerator { static generateString() { return "test"; } }',
  'utils/FakeBibleCatalog.ts': 'export class FakeBibleCatalog {}',
  'utils/ScenarioGenerator.ts': 'export class ScenarioGenerator {}',
  'utils/PerformanceTimer.ts': 'export class PerformanceTimer { start() {} stop() {} }',
  'utils/MemoryProfiler.ts': 'export class MemoryProfiler { snapshot() {} }',
  'utils/ArchitectureValidator.ts': 'export class ArchitectureValidator { validate() { return true; } }',
  'utils/BenchmarkRunner.ts': 'export class BenchmarkRunner { run() {} }',

  // Integration
  'integration/ApplicationTestHarness.ts': 'export class ApplicationTestHarness {}',
  'integration/DomainTestHarness.ts': 'export class DomainTestHarness {}',
  'integration/InfrastructureTestHarness.ts': 'export class InfrastructureTestHarness {}',
  'integration/EndToEndHarness.ts': 'export class EndToEndHarness {}',

  // Reports
  'reports/TestReport.ts': 'export class TestReport {}',
  'reports/CoverageReport.ts': 'export class CoverageReport {}',
  'reports/PerformanceReport.ts': 'export class PerformanceReport {}',
  'reports/ArchitectureReport.ts': 'export class ArchitectureReport {}'
};

let indexContent = '';

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, file), content);
  const name = path.basename(file, '.ts');
  const dir = path.dirname(file);
  indexContent += 'export * from "./' + dir + '/' + name + '";\n';
}

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);

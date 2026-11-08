const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'infrastructure');
const dirs = ['repositories', 'storage', 'telemetry', 'logging', 'cache', 'clock', 'guid', 'events', 'transactions', 'configuration', 'adapters'];

dirs.forEach(d => fs.mkdirSync(path.join(srcDir, d), { recursive: true }));

const files = {
  // Repositories
  'repositories/ChallengeRepositoryImpl.ts': 'import { IChallengeRepository } from "../../domain/repositories/IChallengeRepository"; export class ChallengeRepositoryImpl implements IChallengeRepository { async findById(id: string) { return null; } async save(challenge: any) {} }',
  'repositories/LessonRepositoryImpl.ts': 'import { ILessonRepository } from "../../domain/repositories/ILessonRepository"; export class LessonRepositoryImpl implements ILessonRepository { async findById(id: string) { return null; } async save(lesson: any) {} }',
  'repositories/AnalyticsRepositoryImpl.ts': 'import { IAnalyticsRepository } from "../../domain/repositories/IAnalyticsRepository"; export class AnalyticsRepositoryImpl implements IAnalyticsRepository { async findById(id: string) { return null; } async save(analytics: any) {} }',
  'repositories/ConfigurationRepositoryImpl.ts': 'import { IConfigurationRepository } from "../../domain/repositories/IConfigurationRepository"; export class ConfigurationRepositoryImpl implements IConfigurationRepository { async findById(id: string) { return null; } async save(config: any) {} }',
  'repositories/ContentRepositoryImpl.ts': 'import { IContentRepository } from "../../domain/repositories/IContentRepository"; export class ContentRepositoryImpl implements IContentRepository { async findById(id: string) { return null; } async save(content: any) {} }',

  // Storage
  'storage/LocalStorageAdapter.ts': 'import { IStorage } from "../../application/ports/IStorage"; export class LocalStorageAdapter implements IStorage { save(data: any) {} load() { return null; } }',
  'storage/MemoryStorageAdapter.ts': 'import { IStorage } from "../../application/ports/IStorage"; export class MemoryStorageAdapter implements IStorage { save(data: any) {} load() { return null; } }',
  'storage/SessionStorageAdapter.ts': 'import { IStorage } from "../../application/ports/IStorage"; export class SessionStorageAdapter implements IStorage { save(data: any) {} load() { return null; } }',
  'storage/StorageFactory.ts': 'import { IStorage } from "../../application/ports/IStorage"; import { MemoryStorageAdapter } from "./MemoryStorageAdapter"; export class StorageFactory { static create(): IStorage { return new MemoryStorageAdapter(); } }',

  // Cache
  'cache/MemoryCacheAdapter.ts': 'import { ICache } from "../../application/ports/ICache"; export class MemoryCacheAdapter implements ICache { get(key: string) { return null; } set(key: string, value: any) {} }',
  'cache/PersistentCacheAdapter.ts': 'import { ICache } from "../../application/ports/ICache"; export class PersistentCacheAdapter implements ICache { get(key: string) { return null; } set(key: string, value: any) {} }',
  'cache/CacheAdapter.ts': 'import { ICache } from "../../application/ports/ICache"; export class CacheAdapter implements ICache { get(key: string) { return null; } set(key: string, value: any) {} }',

  // Telemetry
  'telemetry/TelemetryAdapter.ts': 'import { ITelemetry } from "../../application/ports/ITelemetry"; export class TelemetryAdapter implements ITelemetry { track(event: string, data: any) {} }',
  'telemetry/ConsoleTelemetryAdapter.ts': 'import { ITelemetry } from "../../application/ports/ITelemetry"; export class ConsoleTelemetryAdapter implements ITelemetry { track(event: string, data: any) { console.log(event, data); } }',

  // Logging
  'logging/LoggerAdapter.ts': 'import { ILogger } from "../../application/ports/ILogger"; export class LoggerAdapter implements ILogger { log(message: string) {} }',
  'logging/ConsoleLogger.ts': 'import { ILogger } from "../../application/ports/ILogger"; export class ConsoleLogger implements ILogger { log(message: string) { console.log(message); } }',
  'logging/SilentLogger.ts': 'import { ILogger } from "../../application/ports/ILogger"; export class SilentLogger implements ILogger { log(message: string) {} }',

  // Clock
  'clock/SystemClock.ts': 'import { IClock } from "../../application/ports/IClock"; export class SystemClock implements IClock { now() { return Date.now(); } }',
  'clock/MockClock.ts': 'import { IClock } from "../../application/ports/IClock"; export class MockClock implements IClock { now() { return 0; } }',

  // GUID
  'guid/GuidGenerator.ts': 'import { IGuidGenerator } from "../../application/ports/IGuidGenerator"; export class GuidGenerator implements IGuidGenerator { generate() { return Math.random().toString(36).substring(7); } }',
  'guid/RandomGuidGenerator.ts': 'import { IGuidGenerator } from "../../application/ports/IGuidGenerator"; export class RandomGuidGenerator implements IGuidGenerator { generate() { return Math.random().toString(36).substring(7); } }',

  // Event Publisher
  'events/EventPublisherAdapter.ts': 'import { IEventPublisher } from "../../application/ports/IEventPublisher"; export class EventPublisherAdapter implements IEventPublisher { publish(event: any) {} }',
  'events/MemoryEventPublisher.ts': 'import { IEventPublisher } from "../../application/ports/IEventPublisher"; export class MemoryEventPublisher implements IEventPublisher { publish(event: any) {} }',

  // Transactions
  'transactions/NoopTransaction.ts': 'import { ITransaction } from "../../application/ports/ITransaction"; export class NoopTransaction implements ITransaction { begin() {} commit() {} rollback() {} }',
  'transactions/MemoryTransaction.ts': 'import { ITransaction } from "../../application/ports/ITransaction"; export class MemoryTransaction implements ITransaction { begin() {} commit() {} rollback() {} }',

  // Configuration
  'configuration/ConfigurationProvider.ts': 'export class ConfigurationProvider {}',
  'configuration/DefaultConfigurationProvider.ts': 'export class DefaultConfigurationProvider {}',
  'configuration/FeatureFlagProvider.ts': 'export class FeatureFlagProvider {}',
  'configuration/PolicyProvider.ts': 'export class PolicyProvider {}',

  // Adapters
  'adapters/EducationalOrchestratorAdapter.ts': 'export class EducationalOrchestratorAdapter {}',
  'adapters/LearningEngineAdapter.ts': 'export class LearningEngineAdapter {}',
  'adapters/AssessmentEngineAdapter.ts': 'export class AssessmentEngineAdapter {}',
  'adapters/TeacherInsightsAdapter.ts': 'export class TeacherInsightsAdapter {}',
  'adapters/AnalyticsAdapter.ts': 'export class AnalyticsAdapter {}'
};

let indexContent = '';

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, file), content);
  const name = path.basename(file, '.ts');
  const dir = path.dirname(file);
  indexContent += 'export * from "./' + dir + '/' + name + '";\n';
}

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);

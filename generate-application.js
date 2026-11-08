const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'application');
const dirs = ['useCases', 'dto', 'commands', 'queries', 'handlers', 'mappers', 'ports', 'services'];

dirs.forEach(d => fs.mkdirSync(path.join(srcDir, d), { recursive: true }));

const files = {
  // DTOs
  'dto/PlayerDTO.ts': 'export interface PlayerDTO { id: string; }',
  'dto/ChallengeDTO.ts': 'export interface ChallengeDTO { id: string; }',
  'dto/LessonDTO.ts': 'export interface LessonDTO { id: string; }',
  'dto/AssessmentDTO.ts': 'export interface AssessmentDTO { id: string; }',
  'dto/AnalyticsDTO.ts': 'export interface AnalyticsDTO { id: string; }',
  'dto/TeacherDTO.ts': 'export interface TeacherDTO { id: string; }',
  'dto/ConfigurationDTO.ts': 'export interface ConfigurationDTO { id: string; }',
  'dto/GameSessionDTO.ts': 'export interface GameSessionDTO { id: string; }',
  'dto/LearningProfileDTO.ts': 'export interface LearningProfileDTO { id: string; }',

  // Commands
  'commands/StartGameCommand.ts': 'export interface StartGameCommand { playerId: string; }',
  'commands/AnswerChallengeCommand.ts': 'export interface AnswerChallengeCommand { challengeId: string; answer: string; }',
  'commands/FinishLessonCommand.ts': 'export interface FinishLessonCommand { lessonId: string; }',
  'commands/GenerateLessonCommand.ts': 'export interface GenerateLessonCommand { topic: string; }',
  'commands/UpdateConfigurationCommand.ts': 'export interface UpdateConfigurationCommand { config: any; }',
  'commands/SyncLocalDataCommand.ts': 'export interface SyncLocalDataCommand { force: boolean; }',
  'commands/CreateAssessmentCommand.ts': 'export interface CreateAssessmentCommand { studentId: string; }',
  'commands/RunSimulationCommand.ts': 'export interface RunSimulationCommand { target: string; }',

  // Queries
  'queries/GetPlayerProgressQuery.ts': 'export interface GetPlayerProgressQuery { playerId: string; }',
  'queries/GetAnalyticsQuery.ts': 'export interface GetAnalyticsQuery { timeframe: string; }',
  'queries/GetLessonQuery.ts': 'export interface GetLessonQuery { lessonId: string; }',
  'queries/GetTeacherDashboardQuery.ts': 'export interface GetTeacherDashboardQuery { teacherId: string; }',
  'queries/GetRecommendationsQuery.ts': 'export interface GetRecommendationsQuery { studentId: string; }',
  'queries/GetCatalogQuery.ts': 'export interface GetCatalogQuery { }',
  'queries/GetAssessmentQuery.ts': 'export interface GetAssessmentQuery { assessmentId: string; }',

  // Use Cases
  'useCases/StartGameUseCase.ts': 'export class StartGameUseCase { execute() {} }',
  'useCases/AnswerChallengeUseCase.ts': 'export class AnswerChallengeUseCase { execute() {} }',
  'useCases/FinishGameUseCase.ts': 'export class FinishGameUseCase { execute() {} }',
  'useCases/GenerateLessonUseCase.ts': 'export class GenerateLessonUseCase { execute() {} }',
  'useCases/GenerateAssessmentUseCase.ts': 'export class GenerateAssessmentUseCase { execute() {} }',
  'useCases/GenerateRecommendationsUseCase.ts': 'export class GenerateRecommendationsUseCase { execute() {} }',
  'useCases/SyncGameUseCase.ts': 'export class SyncGameUseCase { execute() {} }',
  'useCases/AnalyzeProgressUseCase.ts': 'export class AnalyzeProgressUseCase { execute() {} }',
  'useCases/AnalyzeTeacherDashboardUseCase.ts': 'export class AnalyzeTeacherDashboardUseCase { execute() {} }',
  'useCases/ValidateContentUseCase.ts': 'export class ValidateContentUseCase { execute() {} }',
  'useCases/RunSimulationUseCase.ts': 'export class RunSimulationUseCase { execute() {} }',
  'useCases/ExecuteWorkflowUseCase.ts': 'export class ExecuteWorkflowUseCase { execute() {} }',

  // Handlers
  'handlers/CommandHandler.ts': 'export interface CommandHandler<T> { handle(command: T): Promise<void>; }',
  'handlers/QueryHandler.ts': 'export interface QueryHandler<T, R> { handle(query: T): Promise<R>; }',
  'handlers/UseCaseExecutor.ts': 'export class UseCaseExecutor { execute(useCase: any, args: any) {} }',

  // Mappers
  'mappers/ChallengeMapper.ts': 'export class ChallengeMapper { toDTO(entity: any): any { return {}; } toDomain(dto: any): any { return {}; } }',
  'mappers/LessonMapper.ts': 'export class LessonMapper { toDTO(entity: any): any { return {}; } toDomain(dto: any): any { return {}; } }',
  'mappers/AnalyticsMapper.ts': 'export class AnalyticsMapper { toDTO(entity: any): any { return {}; } toDomain(dto: any): any { return {}; } }',
  'mappers/AssessmentMapper.ts': 'export class AssessmentMapper { toDTO(entity: any): any { return {}; } toDomain(dto: any): any { return {}; } }',
  'mappers/PlayerMapper.ts': 'export class PlayerMapper { toDTO(entity: any): any { return {}; } toDomain(dto: any): any { return {}; } }',
  'mappers/DTOMapper.ts': 'export class DTOMapper { map(source: any): any { return {}; } }',

  // Ports
  'ports/ILogger.ts': 'export interface ILogger { log(message: string): void; }',
  'ports/ICache.ts': 'export interface ICache { get(key: string): any; set(key: string, value: any): void; }',
  'ports/ITelemetry.ts': 'export interface ITelemetry { track(event: string, data: any): void; }',
  'ports/IClock.ts': 'export interface IClock { now(): number; }',
  'ports/IGuidGenerator.ts': 'export interface IGuidGenerator { generate(): string; }',
  'ports/IEventPublisher.ts': 'export interface IEventPublisher { publish(event: any): void; }',
  'ports/ITransaction.ts': 'export interface ITransaction { begin(): void; commit(): void; rollback(): void; }',
  'ports/IStorage.ts': 'export interface IStorage { save(data: any): void; load(): any; }',

  // Application Services
  'services/GameApplicationService.ts': 'export class GameApplicationService {}',
  'services/TeacherApplicationService.ts': 'export class TeacherApplicationService {}',
  'services/AnalyticsApplicationService.ts': 'export class AnalyticsApplicationService {}',
  'services/AssessmentApplicationService.ts': 'export class AssessmentApplicationService {}',
  'services/ContentApplicationService.ts': 'export class ContentApplicationService {}'
};

let indexContent = '';

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, file), content);
  const name = path.basename(file, '.ts');
  const dir = path.dirname(file);
  indexContent += 'export * from "./' + dir + '/' + name + '";\n';
}

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);

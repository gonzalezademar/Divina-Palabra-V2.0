const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'domain');
const dirs = ['entities', 'valueObjects', 'services', 'events', 'repositories', 'factories', 'specifications', 'policies'];

dirs.forEach(d => fs.mkdirSync(path.join(srcDir, d), { recursive: true }));

const files = {
  'entities/Challenge.ts': `export class Challenge { constructor(public readonly id: string) {} }`,
  'entities/Lesson.ts': `export class Lesson { constructor(public readonly id: string) {} }`,
  'entities/Player.ts': `export class Player { constructor(public readonly id: string) {} }`,
  'entities/Teacher.ts': `export class Teacher { constructor(public readonly id: string) {} }`,
  'entities/GameSession.ts': `export class GameSession { constructor(public readonly id: string) {} }`,
  'entities/Analytics.ts': `export class Analytics { constructor(public readonly id: string) {} }`,
  'entities/ContentPackage.ts': `export class ContentPackage { constructor(public readonly id: string) {} }`,
  'entities/Assessment.ts': `export class Assessment { constructor(public readonly id: string) {} }`,
  'entities/Curriculum.ts': `export class Curriculum { constructor(public readonly id: string) {} }`,
  'entities/LearningProfile.ts': `export class LearningProfile { constructor(public readonly id: string) {} }`,

  'valueObjects/Difficulty.ts': `export class Difficulty { constructor(public readonly level: number) { if (level < 1 || level > 5) throw new Error('Invalid difficulty'); } }`,
  'valueObjects/BloomLevel.ts': `export class BloomLevel { constructor(public readonly level: string) {} }`,
  'valueObjects/DoctrinalProfile.ts': `export class DoctrinalProfile { constructor(public readonly profile: string) {} }`,
  'valueObjects/BibleReference.ts': `export class BibleReference { constructor(public readonly book: string, public readonly chapter: number, public readonly verse: number) {} }`,
  'valueObjects/Language.ts': `export class Language { constructor(public readonly code: string) {} }`,
  'valueObjects/Version.ts': `export class Version { constructor(public readonly code: string) {} }`,
  'valueObjects/PlayerScore.ts': `export class PlayerScore { constructor(public readonly score: number) {} }`,
  'valueObjects/Progress.ts': `export class Progress { constructor(public readonly percentage: number) {} }`,
  'valueObjects/Competency.ts': `export class Competency { constructor(public readonly name: string) {} }`,
  'valueObjects/LearningObjective.ts': `export class LearningObjective { constructor(public readonly description: string) {} }`,

  'services/ChallengeDomainService.ts': `export class ChallengeDomainService { }`,
  'services/LessonDomainService.ts': `export class LessonDomainService { }`,
  'services/AssessmentDomainService.ts': `export class AssessmentDomainService { }`,
  'services/AnalyticsDomainService.ts': `export class AnalyticsDomainService { }`,
  'services/RecommendationDomainService.ts': `export class RecommendationDomainService { }`,
  'services/ContentDomainService.ts': `export class ContentDomainService { }`,

  'events/ChallengeAnswered.ts': `export interface ChallengeAnswered { eventId: string; challengeId: string; playerId: string; correct: boolean; }`,
  'events/LessonCompleted.ts': `export interface LessonCompleted { eventId: string; lessonId: string; playerId: string; }`,
  'events/StudentProgressUpdated.ts': `export interface StudentProgressUpdated { eventId: string; studentId: string; progress: number; }`,
  'events/AssessmentGenerated.ts': `export interface AssessmentGenerated { eventId: string; assessmentId: string; }`,
  'events/AnalyticsGenerated.ts': `export interface AnalyticsGenerated { eventId: string; analyticsId: string; }`,
  'events/ContentValidated.ts': `export interface ContentValidated { eventId: string; contentId: string; isValid: boolean; }`,
  'events/PluginExecuted.ts': `export interface PluginExecuted { eventId: string; pluginId: string; hook: string; }`,
  'events/WorkflowFinished.ts': `export interface WorkflowFinished { eventId: string; workflowId: string; status: string; }`,

  'specifications/ChallengeSpecification.ts': `export class ChallengeSpecification { isSatisfiedBy(challenge: any): boolean { return true; } }`,
  'specifications/LessonSpecification.ts': `export class LessonSpecification { isSatisfiedBy(lesson: any): boolean { return true; } }`,
  'specifications/DifficultySpecification.ts': `export class DifficultySpecification { isSatisfiedBy(difficulty: any): boolean { return true; } }`,
  'specifications/DoctrineSpecification.ts': `export class DoctrineSpecification { isSatisfiedBy(doctrine: any): boolean { return true; } }`,
  'specifications/ContentSpecification.ts': `export class ContentSpecification { isSatisfiedBy(content: any): boolean { return true; } }`,

  'policies/PromotionPolicy.ts': `export class PromotionPolicy { canPromote(player: any): boolean { return true; } }`,
  'policies/DifficultyPolicy.ts': `export class DifficultyPolicy { calculateNext(current: any): any { return current; } }`,
  'policies/RecommendationPolicy.ts': `export class RecommendationPolicy { getRecommendations(player: any): any[] { return []; } }`,
  'policies/SyncPolicy.ts': `export class SyncPolicy { shouldSync(): boolean { return true; } }`,
  'policies/TeacherPolicy.ts': `export class TeacherPolicy { canManage(teacher: any, classId: string): boolean { return true; } }`,

  'factories/ChallengeFactory.ts': `import { Challenge } from '../entities/Challenge'; export class ChallengeFactory { static create(id: string): Challenge { return new Challenge(id); } }`,
  'factories/LessonFactory.ts': `import { Lesson } from '../entities/Lesson'; export class LessonFactory { static create(id: string): Lesson { return new Lesson(id); } }`,
  'factories/AssessmentFactory.ts': `import { Assessment } from '../entities/Assessment'; export class AssessmentFactory { static create(id: string): Assessment { return new Assessment(id); } }`,
  'factories/AnalyticsFactory.ts': `import { Analytics } from '../entities/Analytics'; export class AnalyticsFactory { static create(id: string): Analytics { return new Analytics(id); } }`,
  'factories/PlayerFactory.ts': `import { Player } from '../entities/Player'; export class PlayerFactory { static create(id: string): Player { return new Player(id); } }`,

  'repositories/IChallengeRepository.ts': `export interface IChallengeRepository { findById(id: string): Promise<any>; save(challenge: any): Promise<void>; }`,
  'repositories/IAnalyticsRepository.ts': `export interface IAnalyticsRepository { findById(id: string): Promise<any>; save(analytics: any): Promise<void>; }`,
  'repositories/ILessonRepository.ts': `export interface ILessonRepository { findById(id: string): Promise<any>; save(lesson: any): Promise<void>; }`,
  'repositories/IConfigurationRepository.ts': `export interface IConfigurationRepository { findById(id: string): Promise<any>; save(config: any): Promise<void>; }`,
  'repositories/IContentRepository.ts': `export interface IContentRepository { findById(id: string): Promise<any>; save(content: any): Promise<void>; }`
};

let indexContent = '';

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, file), content);
  const name = path.basename(file, '.ts');
  const dir = path.dirname(file);
  indexContent += 'export * from ' + '"./' + dir + '/' + name + '";\n';
}

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);

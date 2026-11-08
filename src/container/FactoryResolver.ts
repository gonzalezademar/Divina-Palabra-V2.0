import { dependencyContainer } from "./DependencyContainer";
export class FactoryResolver {
  static resolveFactory<T>(key: string): () => T {
    return () => dependencyContainer.provider.resolve<T>(key);
  }
}
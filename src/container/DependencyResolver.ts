import { dependencyContainer } from "./DependencyContainer";
export class DependencyResolver {
  static resolve<T>(key: string): T { return dependencyContainer.provider.resolve<T>(key); }
}
export interface Repository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  find(predicate: (item: T) => boolean): Promise<T | null>;
  filter(predicate: (item: T) => boolean): Promise<T[]>;
  search(query: string): Promise<T[]>;
  count(): Promise<number>;
  exists(id: string): Promise<boolean>;
  version(): string;
  lastUpdate(): number;
}

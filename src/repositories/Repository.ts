import { FilterQuery } from 'mongoose';
import { BaseRepository, FilterOptions } from '.';

export abstract class Repository<T> implements BaseRepository<T> {
  public abstract deleteOne(filter: FilterQuery<T>): Promise<void>
  public abstract create(data: T): Promise<T>;
  public abstract findOne(filter: FilterOptions): Promise<T> | undefined;

}

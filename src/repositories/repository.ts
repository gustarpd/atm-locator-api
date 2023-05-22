import { FilterQuery, FlattenMaps } from 'mongoose';
import { BaseRepository, FilterOptions, WithId } from '.';

export abstract class Repository<T> implements BaseRepository<T> {
  public abstract create(data: T): Promise<T>
  public abstract findOne(options: FilterOptions): Promise<T> | undefined 
  public abstract deleteOne(filter: FilterQuery<T>): Promise<void> 
  public abstract find(options: FilterOptions): Promise<FlattenMaps<WithId<T>>[] | undefined> 

}

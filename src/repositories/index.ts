import { Favorits, FavoritsATM } from '../models/favorits'
import { User } from "../models/user"
import { FilterQuery, FlattenMaps } from "mongoose"

export type FilterOptions = Record<string, unknown>
export type WithId<T> = { id: string } & T;
export interface BaseRepository<T> {
  create(data: T): Promise<T>
  findOne(options: FilterOptions): Promise<T> | undefined
  deleteOne(filter: FilterQuery<T>): Promise<void>
  find(options: FilterOptions): Promise<FlattenMaps<WithId<T>>[] | undefined>;
}

export interface UserRepository extends BaseRepository<User> {
  findOneById(id: string): Promise<WithId<User> | undefined>;
  findOneByEmail(email: string): Promise<WithId<User> | undefined>;
}

export interface FavoritesRepository extends BaseRepository<FavoritsATM> {
  findManyById(userId: string): Promise<FlattenMaps<WithId<FavoritsATM>>[] | undefined>;
  deleteById(id: string): Promise<void>;
}
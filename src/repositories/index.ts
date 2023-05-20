import { FilterQuery } from "mongoose"

export type FilterOptions = Record<string, unknown>

export interface BaseRepository<T> {
  create(data: T): Promise<T>
  findOne(options: FilterOptions): Promise<T> | undefined
  deleteOne(filter: FilterQuery<T>): Promise<void>
}
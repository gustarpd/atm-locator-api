import { FilterQuery, Model } from 'mongoose';
import { FilterOptions, WithId } from '.';
import { Repository } from './repository';

export class DefaultRepository<T> extends Repository<T> {
  constructor(protected model: Model<T>) {
    super();
  }
  async create(data: T): Promise<T> {
    try {
      const model = new this.model(data);
      const createdData = await model.save();
      return createdData;
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }
  async findOne(options: FilterOptions): Promise<any> {
    try {
      const data = await this.model.findOne(options);
      return data?.toJSON();
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }

  async deleteOne(filter: FilterQuery<T>): Promise<void> {
    try {
      await this.model.deleteOne(filter);
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }

  async find(filter: FilterOptions) {
    try {
      const data = await this.model.find(filter);
      return data.map((d) => d.toJSON<WithId<T>>());
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }
  
}

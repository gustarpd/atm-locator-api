import { Favorits, FavoritsATM } from '../models/favorits';
import { FavoritesRepository, WithId } from '.';
import { User } from '../models/user';
import { DefaultRepository } from './default-repository';
import { FavoritsATms } from '@src/service/favorits';
import { FlattenMaps } from 'mongoose';

export class FavoritesMongoDBRepository
  extends DefaultRepository<FavoritsATM>
  implements FavoritesRepository
{
  constructor(favoritesModel = Favorits) {
    super(favoritesModel);
  }

  async findOneById(id: string) {
    return this.findOne({ _id: id });
  }

  async deleteById(id: string) {
    return this.deleteOne({ _id: id })
    .then(fav => console.log(fav))
  }

  async findManyById(id: string) {
    return await this.find({ _id: id })
  }
}

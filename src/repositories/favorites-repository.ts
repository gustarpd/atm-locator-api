import { Favorits, FavoritsATM } from '../models/favorits';
import { FavoritesRepository } from '.';
import { DefaultRepository } from './default-repository';


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
    return await this.find({ id })
  }
}

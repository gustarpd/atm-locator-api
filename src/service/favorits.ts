import { FavoritesMongoDBRepository } from '../repositories/favorites-repository';
import { Favorits } from '../models/favorits';
export class FavoritsATms {
  public async saveFavorits(
    name: string,
    city: string,
    line: string,
    distance: string,
    latintude: string,
    longitude: string,
    userId: string
  ) {
    const saveATM = new FavoritesMongoDBRepository()

    const newfavorits = await saveATM.create({ name, city, line, distance, latintude, longitude, id: userId })
    return newfavorits;
  }

  public async deleteFavorite(id: string) {
   Favorits.deleteOne({ _id: id }).then(fav => console.log(fav))
  }
}

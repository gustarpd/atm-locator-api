import { FavoritesMongoDBRepository } from '../repositories/favorites-repository';
import { Favorits } from '../models/favorits';
export class FavoritsATms {
  constructor(private favoritesRepository = new FavoritesMongoDBRepository()) {}
  public async saveFavorits(
    name: string,
    city: string,
    line: string,
    distance: string,
    latintude: string,
    longitude: string,
    userId: string
  ) {
    const newfavorits = await this.favoritesRepository.create({
      name,
      city,
      line,
      distance,
      latintude,
      longitude,
      id: userId,
    });
    return userId;
  }

  public async deleteFavorite(id: string) {
    await this.favoritesRepository.deleteById(id);
  }

  public getAllFavorites(id: string) {
    const data = this.favoritesRepository.findManyById(id);
    return data;
  }

  public async deleteATMById(id: string) {
    await this.favoritesRepository.deleteById(id);
  }
}

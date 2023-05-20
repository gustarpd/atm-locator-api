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
    const saveATM = new Favorits({
      name,
      city,
      line,
      distance,
      latintude,
      longitude,
      userId,
    });

    const newfavorits = await saveATM.save();
    return newfavorits;
  }

  public async deleteFavorite(id: string) {
   Favorits.deleteOne({ _id: id }).then(fav => console.log(fav))
  }
}

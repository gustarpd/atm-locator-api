import { Favorits } from '../models/favorits';
export class FavoritsATms {
  public async saveFavorits(name: string, city: string, line: string, userId: string) {
    const saveATM = new Favorits({
      name,
      city,
      line,
      userId
    });

    const newfavorits = await saveATM.save();
    return newfavorits;
  }
}

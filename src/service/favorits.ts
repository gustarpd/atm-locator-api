import { Favorits } from '@src/models/favorits';
import { InternalError } from '@src/util/errors/internal-error';

export class FavoritsATms {
  public async saveFavorits(name: string, city: string, line: string) {
    try {
      const saveATM = new Favorits({
        name,
        city,
        line,
      });

      const newfavorits = await saveATM.save();

      if (newfavorits) {
        return 'Favorits save with success';
      }
    } catch (error) {
      throw new InternalError('Faled to save ATMs on db');
    }
  }
}

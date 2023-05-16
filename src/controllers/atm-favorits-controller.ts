import { Request, Response } from 'express';
import { FavoritsATms } from '@src/service/favorits';

export class ATMFavoriteController {
  public async getTMS(req: Request<{ zipcode: string }>, res: Response) {
    const { name, city, line } = req.body;

    const requetATMs = new FavoritsATms();
    const saveATM = await requetATMs.saveFavorits(name, city, line);

    if (saveATM) {
      res.status(201).json({ saveATM });
    }
  }
}

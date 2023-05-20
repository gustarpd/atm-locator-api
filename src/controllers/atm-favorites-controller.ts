import { Request, Response } from 'express';
import { FavoritsATms } from '../service/favorits';
import { AuthService } from '../service/auth';
import { Private } from '@src/middlewares/auth';

export class ATMFavoriteController {
  public async create(req: Request, res: Response) {
    const { name, city, line, lantitude, longitude, distance } = req.body;
    if (req.headers.authorization) {
      const [_, token] = req.headers.authorization.split(' ');

      try {
        const userdecoded = AuthService.decodeToken(token);
        console.log(userdecoded)
        const requetATMs = new FavoritsATms();
        const result = await requetATMs.saveFavorits(
          name,
          city,
          line,
          lantitude,
          longitude,
          distance,
          userdecoded.id
        );

        return res.status(201).json({ result });
      } catch (error) {
        return res.status(400).json('user not found');
      }
    }
    return res.status(500).json({ error: 'something is wrong' });
  }
}

//6468e5a7b6a481a1ceae729d

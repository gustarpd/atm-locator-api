import { Request, Response } from 'express';
import { FavoritsATms } from '../service/favorits';
import { AuthService } from '../service/auth';
import { Private } from '@src/middlewares/auth';

export class ATMFavoriteController {
  public async create(req: Request, res: Response) {
    const { name, city, line } = req.body;
    if (req.headers.authorization) {
      const [authtype, token] = req.headers.authorization.split(' ');
      if (authtype === 'Bearer') {
        try {
          const userdecoded = AuthService.decodeToken(token);
          const requetATMs = new FavoritsATms();
          const request = await requetATMs.saveFavorits(
            name,
            city,
            line,
            userdecoded.id
          );

          return res.status(201).json({ favorits: request });
        } catch (error) {
          console.log('error no jwt');
        }
      }
    }
    return res.status(500).json({ error: 'something is wrong' });
  }
}

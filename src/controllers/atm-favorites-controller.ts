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

  public async delete(req: Request, res: Response) {
     const { id } = req.params

     const favorite = new FavoritsATms()
     const makedelete = await favorite.deleteFavorite(id)
     console.log(makedelete)
     return res.status(200).json(makedelete)
  }
}


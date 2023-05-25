import { Request, Response } from 'express';
import { FavoritsATms } from '../service/favorits';
import { AuthService } from '../service/auth';
import { Favorits } from '../models/favorits';

export class ATMFavoriteController {
  public async create(req: Request, res: Response) {
    const { name, city, line, lantitude, longitude, distance } = req.body;

    if (req.headers.authorization) {
      const [_, token] = req.headers.authorization.split(' ');

      try {
        const userdecoded = AuthService.decodeToken(token);
        console.log(userdecoded, "user decoded");
        const favorite = new FavoritsATms();
        const result = await favorite.saveFavorits(
          name,
          city,
          line,
          lantitude,
          longitude,
          distance,
          userdecoded.payload.id
        );

        return res.status(201).json({ result });
      } catch (error) {
        return res.status(400).json('user not found');
      }
    }
    return res.status(500).json({ error: 'something is wrong' });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const favorite = new FavoritsATms();
      const makedelete = await favorite.deleteATMById(id);
      return res.status(200).json(makedelete);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getAllAMTFavorites(req: Request, res: Response) {
    const favorites = new FavoritsATms();
    const { userId } = req.params;

    if (req.headers.authorization) {
      const [_, token] = req.headers.authorization.split(' ');
      const userdecoded = AuthService.decodeToken(token);
      const getAllAtm = await favorites.getAllFavorites(userdecoded.payload.id);
      
      console.log(userdecoded.payload.id)
      return res.status(200).json(getAllAtm);
    }

    return res.status(500).json({ error: 'internal server error' });
  }
}

import { Request, Response } from 'express';
import { MastercardATMs as MastercardATMs } from '../clients/master-location';

export class ATMFavoriteController {
  public async getTMS(req: Request<{ zipcode: string }>, res: Response) {
    const { zipcode } = req.params;

    const requetATMs = new MastercardATMs();
    const ATMResponse = await requetATMs.fetchATMs();

    return res.status(200).json({ ATMResponse });
  }
}

import { AuthService } from '../../src/service/auth';
import { Response, Request, NextFunction } from 'express';

export function Private(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    const [authtype, token] = req.headers.authorization.split(' ');
    if (authtype === 'Bearer') {
      try {
        AuthService.decodeToken(token);

        return next();
      } catch (error) {
        console.log('error no jwt');
      }
    }
  } else {
    return res.json({ error: 'not authorized' });
  }
}

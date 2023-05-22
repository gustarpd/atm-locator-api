import { Favorits } from '../models/favorits';
import { User } from '../models/user';
import { AuthService } from '../service/auth';
import { Request, Response } from 'express';
import { EmailValidator } from '../../src/util/email-validator';
// import { UserService } from '@src/service/User';
import { UserMongoDBRepository } from '../repositories/user-repository';
import { UserService } from '../service/User';

export class CreatenewUserController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: 400, message: 'privide all fields' });
      }
      const user = new UserService();
      const result = await user.createUser(req.body);

      return res.status(201).json({ user: result });
    } catch (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'internal server error' });
    }
  }

  public async authenticate(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { email, password } = req.body;
    const validateEmail = new EmailValidator();
    const user = new UserService();
    const result = await user.getUserByEmail(email);

    if (!validateEmail.isValid(email)) {
      return res.status(400).json({ error: 'Email is not valid' });
    }

    if (!user) {
      return res.status(401).send({ code: 401, error: 'User not found' });
    }

    if (!user) {
      return res.status(401).send({ code: 401, error: 'User not-found' });
    }

    if (!(await AuthService.comparePassword(password, result.password))) {
      return res
        .status(401)
        .send({ code: 401, error: 'Password does not match' });
    }

    const token = AuthService.generateToken(result);
    return res.status(200).send({ token });
  }

  public async me(req: Request, res: Response) {
    const { userId } = req.body;
    try {
      if (!userId) {
        return Res.status(400).json({
          message: 'need to provide the user`s id',
        });
      }
      const userInfos = await Favorits.find({ userId });
      console.log(userId);
      return Res.status(200).json({ favs: userInfos });
    } catch (error) {
      console.error('Error getting user favorites:', error);
      return res
        .status(500)
        .json({ error: 500, message: 'Internal server error' });
    }
  }
}

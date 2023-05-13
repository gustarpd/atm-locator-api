import { User } from '../models/user';
import { AuthService } from '../service/auth';
import { Request, Response } from 'express';

export class CreatenewUserController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
      return res.status(400).json({ error: 400, message: 'privide all fields' })
    }
    const user = new User({
      name,
      email,
      password,
    });
    const newuser = await user.save();
    return res.status(201).json({ user: newuser });
  }

  public async authenticate(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ code: 401, error: 'User not-found' });
    }

    if (!(await AuthService.comparePassword(password, user.password))) {
      return res.status(401).send({ code: 401, error: 'passs does not match' });
    }
    const token = AuthService.generateToken(user.toJSON());
    return res.status(200).send({ token });
  }
}

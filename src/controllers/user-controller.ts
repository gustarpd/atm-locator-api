import { User } from '../models/user';
import { AuthService } from '../service/auth';
import { Request, Response } from 'express';

export class CreatenewUserController {
  public async create(req: Request, res: Response) {
    const { name, email, password} = req.body;

    const user = new User({
      name,
      email,
      password
    });
    const newuser = await user.save();    
    return res.status(201).json({ user: newuser });
  }

  public async authenticate(email: string) {
    const user = await User.findOne({ email });

    if (!user) return 'user doesnt exists'
   
    const token = AuthService.generateToken(user.toJSON());
    return token
  }
}

import { Favorits } from '../models/favorits';
import { User } from '../models/user';
import { AuthService } from '../service/auth';
import { Request, Response } from 'express';
import { EmailValidator } from '../../src/util/email-validator';

export class CreatenewUserController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: 400, message: 'privide all fields' });
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
    const validateEmail = new EmailValidator();
    const user = await User.findOne({ email });
    if (validateEmail.isValid(email)) {
      if (!user) {
        return res.status(401).send({ code: 401, error: 'User not-found' });
      }
    }else {
      return res.status(400).json({ error: 'email is not valid ' })
    }
    if (!(await AuthService.comparePassword(password, user.password))) {
      return res.status(401).send({ code: 401, error: 'passs does not match' });
    }
    const token = AuthService.generateToken(user.toJSON());
    return res.status(200).send({ token });
  }

  public async me(req: Request, Res: Response) {
    const { userId } = req.params;

    const userInfos = await Favorits.find({ userId });

    return Res.status(200).json({ favs: userInfos });
  }
}

// {
// 	"user": {
// 		"name": "RUA Y",
// 		"email": "mail234@mail.com",
// 		"password": "$2b$05$yIk5tBVDpN8ynLYBjPjY3O5YJVmKC61WTAbKT5QZoCBAtdhcx/j0m",
// 		"id": "6463f2def13feef3f4c76ffb"
// 	}
// }

import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

export interface decodedUser extends Omit<User, '_id'> {
  payload: {
    id: string;
  };
}
export class AuthService {
  public static generateToken(payload: object) {
    return JWT.sign({ payload }, 'some-key', {
      expiresIn: 3000000000,
    });
  }

  public static hashPassword(password: string, salt = 5) {
    return bcrypt.hash(password, salt);
  }

  public static comparePassword(password: string, passwordEncrpted: string) {
    return bcrypt.compare(password, passwordEncrpted);
  }

  public static decodeToken(token: string): decodedUser {
    return JWT.verify(token, 'some-key') as decodedUser;
  }
}

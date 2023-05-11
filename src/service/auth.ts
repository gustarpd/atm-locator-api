import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt'
export class AuthService {
  public static generateToken(paylod: object) {
    return JWT.sign(paylod, 'some-key', {
      expiresIn: 30000,
    });
  }
  
  public static hashPassword(password: string, salt = 5) {
    return bcrypt.hash(password, salt)
  }

  public static comparePassword(password: string, passwordEncrpted: string) {
    return bcrypt.compare(password, passwordEncrpted)
  }

  public static decodeToken(token: string) {
    return JWT.verify(token, 'some-key');
  }
}

import { User } from '@src/models/user';
import { BaseRepository } from '@src/repositories';
import { UserMongoDBRepository } from '../repositories/user-repository';

export class UserService {
  public async createUser(data: any) {
    const user = new UserMongoDBRepository();
    const result = await user.create(data);
    return result;
  }

  public async getUserByEmail(email: string) {
    const user = new UserMongoDBRepository();
    const result = await user.findOneByEmail(email);
    return result;
  }
}

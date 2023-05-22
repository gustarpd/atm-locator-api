import { UserRepository } from '.';
import { User } from '../models/user';
import { DefaultRepository } from './default-repository';

export class UserMongoDBRepository
  extends DefaultRepository<User>
  implements UserRepository
{
  constructor(userModel = User) {
    super(userModel);
  }

  async findOneById(id: string) {
    return this.findOne({ _id: id });
  }

  async findOneByEmail(email: string) {
    return await this.findOne({ email });
  }
}

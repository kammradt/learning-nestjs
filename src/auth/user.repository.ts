import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthRequest } from './dto/auth-request';
import * as bcrypt from 'bcryptjs'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async persist(authRequest: AuthRequest): Promise<void> {
    const { username, password } = authRequest;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt()
    user.password = await this.hashPassword(password, user.salt);

    await user.save();
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt)
  }

}

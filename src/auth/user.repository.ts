import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthRequest } from './dto/auth-request';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async persist(authRequest: AuthRequest): Promise<void> {
    const { username, password } = authRequest;

    const user = new User();
    user.username = username;
    user.password = password;

    await user.save();
  }
}

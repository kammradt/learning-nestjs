import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthRequest } from './dto/auth-request';
import * as bcrypt from 'bcryptjs';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async persist(authRequest: AuthRequest): Promise<void> {
    const { username, password } = authRequest;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    await user.save();
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.findOne({ username });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async validatePassword(authRequest: AuthRequest): Promise<string> {
    const { username, password } = authRequest;
    const user = await this.findByUsername(username);

    if (!await user.hasCorrectPassword(password)) {
      throw new UnauthorizedException();
    }

    return user.username;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

}

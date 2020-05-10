import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthRequest } from './dto/auth-request';
import * as bcrypt from 'bcryptjs';
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Role } from './enum/role.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async persist(authRequest: AuthRequest): Promise<void> {
    const { username, password } = authRequest;

    const user = this.create();
    user.username = username;
    user.role = Role.REGULAR;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (e) {
      throw new ConflictException("Username should be unique")
    }
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

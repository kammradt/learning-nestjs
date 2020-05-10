import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Role } from './enum/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async byId(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete({ id });
    if (!result.affected) {
      throw new NotFoundException();
    }
  }

  async updateRole(id: string, role: Role): Promise<User> {
    const user = await this.byId(id);
    user.role = role;
    await user.save();
    return user;
  }


}

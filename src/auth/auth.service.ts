import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRequest } from './dto/auth-request';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository) {
  }

  async signUp(authRequest: AuthRequest): Promise<void> {
    return this.userRepository.persist(authRequest);
  }

}

import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRequest } from './dto/auth-request';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
import { JwtResponse } from './dto/jwt-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
  }

  async signUp(authRequest: AuthRequest): Promise<void> {
    return this.userRepository.persist(authRequest);
  }

  async signIn(authRequest: AuthRequest): Promise<JwtResponse> {
    const username: string = await this.userRepository.validatePassword(authRequest);
    const payload: JwtPayload = { username };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken };
  }

}

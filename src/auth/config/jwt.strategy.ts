import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../dto/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';
import * as config from 'config';

const { secret } = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return await this.userRepository.findByUsername(payload.username);
  }
}

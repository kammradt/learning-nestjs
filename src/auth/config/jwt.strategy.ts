import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../dto/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ';sdf#$%sfgdfDFG2;3l4;234kon3456/RTGB',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return await this.userRepository.findByUsername(payload.username)
  }
}

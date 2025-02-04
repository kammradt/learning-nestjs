import { Body, Controller, Post } from '@nestjs/common';
import { AuthRequest } from './dto/auth-request';
import { AuthService } from './auth.service';
import { JwtResponse } from './dto/jwt-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('signup')
  signUp(@Body() authRequest: AuthRequest): Promise<void> {
    return this.authService.signUp(authRequest);
  }

  @Post('signin')
  signIn(@Body() authRequest: AuthRequest): Promise<JwtResponse> {
    return this.authService.signIn(authRequest);
  }

}

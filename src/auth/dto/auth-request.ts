import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRequest {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

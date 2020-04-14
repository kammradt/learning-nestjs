import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

const REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const REGEX_MESSAGE = 'Passwords will contain at least 1 upper case letter. ' +
  'Passwords will contain at least 1 lower case letter. ' +
  'Passwords will contain at least 1 number or special character. ';

export class AuthRequest {

  @MinLength(4)
  @MaxLength(64)
  @IsString()
  username: string;

  @MinLength(4)
  @MaxLength(64)
  @IsString()
  @Matches(REGEX, { message: REGEX_MESSAGE })
  password: string;

}

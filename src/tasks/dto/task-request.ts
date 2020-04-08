import { IsNotEmpty, IsString } from 'class-validator';

export class TaskRequest {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

}

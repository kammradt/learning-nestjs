import { IsNotEmpty } from 'class-validator';

export class TaskRequest {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

}

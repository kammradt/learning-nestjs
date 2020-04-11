import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';


export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!this.isValid(value)) {
      throw new BadRequestException(`'${value}' is not a valid status`);
    }
    return value;
  }

  private isValid(status: any): boolean {
    return Object.keys(TaskStatus).includes(status.toUpperCase());
  }

}

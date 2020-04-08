import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';


export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowed: TaskStatus[] = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];

  transform(value: any) {
    if (!this.isValid(value)) {
      throw new BadRequestException(`'${value}' is not a valid status`);
    }
    return value;
  }

  private isValid(status: any): boolean {
    return this.allowed.includes(status.toUpperCase());
  }

}

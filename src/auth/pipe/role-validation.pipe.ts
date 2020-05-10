import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Role } from '../enum/role.enum';

export class RoleValidationPipe implements PipeTransform {
  transform(value: any) {
    console.log(value);
    if (!this.isValid(value)) {
      throw new BadRequestException(`'${value}' is not a valid role`);
    }
    return value;
  }

  private isValid(status: any): boolean {
    return Object.keys(Role).includes(status.toUpperCase());
  }

}

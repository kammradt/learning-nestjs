import { Body, Controller, Delete, Get, Logger, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorator/roles.decorator';
import { Role } from './enum/role.enum';
import { UsersService } from './users.service';
import { RoleValidationPipe } from './pipe/role-validation.pipe';
import { GetUser } from './decorator/get-user.decorator';

@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
  private logger = new Logger('TasksController');

  constructor(private userService: UsersService) {
  }

  @Get()
  all(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Delete(':id')
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ) {
    this.logger.log(`User: [${user.username}] deleting a User with id: [${id}]`);
    return this.userService.delete(id);
  }

  @Patch(':id/role')
  updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('role', RoleValidationPipe) role: Role,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.log(`User: [${user.username}] updating a Role of user with id: [${id} ]to role: [${role}]`);
    return this.userService.updateRole(id, role);
  }

}

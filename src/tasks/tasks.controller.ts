import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskRequest } from './dto/task-request';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { TaskFilteredRequest } from './dto/task-filtered-request';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  all(@Query() taskFilter: TaskFilteredRequest): Promise<Task[]> {
    return this.tasksService.all(taskFilter);
  }

  @Get(':id')
  byId(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.tasksService.byId(id);
  }

  @Post()
  create(
    @Body() taskRequest: TaskRequest,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.create(taskRequest, user);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tasksService.delete(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, status);
  }

}

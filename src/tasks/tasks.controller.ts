import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { TaskRequest } from './dto/task-request';
import { TaskFilteredRequest } from './dto/task-filtered-request';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  all(@Query() filterDTO: TaskFilteredRequest): Task[] {
    return this.tasksService.filtered(filterDTO);
  }

  @Get('/:id')
  byId(@Param('id') id: string): Task {
    return this.tasksService.byId(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() taskRequest: TaskRequest): Task {
    return this.tasksService.create(taskRequest);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): void {
    this.tasksService.delete(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.updateStatus(id, status);
  }


}

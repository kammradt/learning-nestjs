import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post, Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskRequest } from './dto/task-request';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  // @Get()
  // all(@Query(ValidationPipe) filterDTO: TaskFilteredRequest): Task[] {
  //   return this.tasksService.filtered(filterDTO);
  // }
  //

  @Get('/:id')
  byId(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.tasksService.byId(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() taskRequest: TaskRequest): Promise<Task> {
    return this.tasksService.create(taskRequest);
  }

  @Delete('/:id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tasksService.delete(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, status);
  }

}

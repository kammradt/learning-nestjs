import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { TaskRequest } from './dto/task-request';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  all(): Task[] {
    return this.tasksService.all();
  }

  @Get('/:id')
  byId(@Param('id') id: string): Task {
    return this.tasksService.byId(id);
  }

  @Post()
  create(@Body() taskRequest: TaskRequest): Task {
    return this.tasksService.create(taskRequest);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): void {
    this.tasksService.delete(id);
  }


}

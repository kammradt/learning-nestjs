import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  create(@Body() taskRequest: TaskRequest): Task {
    return this.tasksService.create(taskRequest);
  }


}

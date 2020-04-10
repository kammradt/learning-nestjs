import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskRequest } from './dto/task-request';

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


  // @Delete('/:id')
  // delete(@Param('id') id: string): void {
  //   this.tasksService.delete(id);
  // }
  //
  // @Patch('/:id/status')
  // updateStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateStatus(id, status);
  // }


}

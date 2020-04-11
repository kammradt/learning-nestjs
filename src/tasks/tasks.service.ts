import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRequest } from './dto/task-request';
import { TaskStatus } from './task-status.enum';
import { TaskFilteredRequest } from './dto/task-filtered-request';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {
  }

  // filtered(filterDTO: TaskFilteredRequest): Task[] {
  //   return Object.keys(filterDTO).length
  //     ? this.filter(filterDTO)
  //     : this.all();
  // }
  //
  // private all(): Task[] {
  //   return this.tasks;
  // }
  //
  // private filter(filterDTO: TaskFilteredRequest): Task[] {
  //   const { status, search } = filterDTO;
  //   let tasks = this.all();
  //
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter(task => task.description.includes(search) || task.title.includes(search));
  //   }
  //
  //   return tasks;
  // }
  //

  async byId(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  create(taskRequest: TaskRequest): Promise<Task> {
    return this.taskRepository.persist(taskRequest);
  }

  async delete(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id)
    if (!result.affected) {
      throw new NotFoundException();
    }
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.byId(id)
    task.status = status
    await task.save();
    return task;
  }
}

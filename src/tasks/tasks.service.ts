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

  async all(taskFilter: TaskFilteredRequest): Promise<Task[]> {
    return this.taskRepository.all(taskFilter);
  }

  async byId(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  create(taskRequest: TaskRequest): Promise<Task> {
    return this.taskRepository.persist(taskRequest);
  }

  async delete(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.byId(id);
    task.status = status;
    await task.save();
    return task;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRequest } from './dto/task-request';
import { TaskStatus } from './enum/task-status.enum';
import { TaskFilteredRequest } from './dto/task-filtered-request';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {
  }

  async all(taskFilter: TaskFilteredRequest, user: User): Promise<Task[]> {
    return this.taskRepository.all(taskFilter, user);
  }

  async byId(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ id, user });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  create(taskRequest: TaskRequest, user: User): Promise<Task> {
    return this.taskRepository.persist(taskRequest, user);
  }

  async delete(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (!result.affected) {
      throw new NotFoundException();
    }
  }

  async updateStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.byId(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}

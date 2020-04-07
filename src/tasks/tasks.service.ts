import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { TaskRequest } from './dto/task-request';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  all(): Task[] {
    return this.tasks;
  }

  byId(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  create(taskRequest: TaskRequest): Task {
    const { title, description } = taskRequest;

    const task: Task = {
      id: uuid(),
      title, description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task: Task = this.byId(id);
    task.status = TaskStatus[status];
    return task;
  }
}

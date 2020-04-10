import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

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

  //
  // create(taskRequest: TaskRequest): Task {
  //   const { title, description } = taskRequest;
  //
  //   const task: Task = {
  //     id: uuid(),
  //     title, description,
  //     status: TaskStatus.OPEN,
  //   };
  //
  //   this.tasks.push(task);
  //   return task;
  // }
  //
  // delete(id: string): void {
  //   const found = this.byId(id);
  //   this.tasks = this.tasks.filter(t => t.id !== found.id);
  // }
  //
  // updateStatus(id: string, status: TaskStatus): Task {
  //   const task: Task = this.byId(id);
  //   task.status = TaskStatus[status];
  //   return task;
  // }
}

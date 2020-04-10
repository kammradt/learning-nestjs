import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { TaskRequest } from './dto/task-request';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async persist(taskRequest: TaskRequest): Promise<Task> {
    const { title, description } = taskRequest;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }

}


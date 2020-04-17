import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { TaskRequest } from './dto/task-request';
import { Task } from './task.entity';
import { TaskFilteredRequest } from './dto/task-filtered-request';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async all(taskFilter: TaskFilteredRequest): Promise<Task[]> {
    const { status, search } = taskFilter;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async persist(taskRequest: TaskRequest, user: User): Promise<Task> {
    const { title, description } = taskRequest;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    return task;
  }

}


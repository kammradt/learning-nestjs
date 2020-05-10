import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './enum/task-status.enum';
import { TaskRequest } from './dto/task-request';
import { Task } from './task.entity';
import { TaskFilteredRequest } from './dto/task-filtered-request';
import { User } from 'src/auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  async all(taskFilter: TaskFilteredRequest, user: User): Promise<Task[]> {
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

    query.andWhere('task.userId = :userId', { userId: user.id });

    try {
      return await query.getMany();
    } catch (e) {
      const message = `Could now retrieve tasks from user: [${user.username}]`;
      this.logger.error(message);
      throw new InternalServerErrorException(message);
    }

  }

  async persist(taskRequest: TaskRequest, user: User): Promise<Task> {
    const { title, description } = taskRequest;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    try {
      await task.save();
      return task;
    } catch (e) {
      const message = `Could now save task from user: [${user.username}] with data: ${JSON.stringify(task)}`;
      this.logger.error(message);
      throw new InternalServerErrorException(message);
    }

  }

}


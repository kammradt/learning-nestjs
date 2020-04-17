import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Task extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User;

}

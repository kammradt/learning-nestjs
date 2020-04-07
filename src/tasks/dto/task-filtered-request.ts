import { TaskStatus } from '../task.model';

export class TaskFilteredRequest {
  status: TaskStatus;
  search: string;
}

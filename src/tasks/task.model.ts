export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In progress',
  DONE = 'Done',
}

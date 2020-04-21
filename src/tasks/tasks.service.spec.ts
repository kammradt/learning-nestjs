import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TaskFilteredRequest } from './dto/task-filtered-request';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockUser = { username: 'Mock User' };

const mockTaskRepository = () => ({
  all: jest.fn(),
  findOne: jest.fn()
});

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('should get all tasks from repository', async () => {
      taskRepository.all.mockResolvedValue('Value123');

      expect(taskRepository.all).not.toHaveBeenCalled();

      const filter: TaskFilteredRequest = { status: TaskStatus.OPEN, search: 'By name' };
      const result = await tasksService.all(filter, mockUser);

      expect(taskRepository.all).toHaveBeenCalledWith(filter, mockUser);
      expect(result).toBe('Value123');
    });
  });

  describe('byId', () => {
    it('should retrieve one task', async () => {
      const mockTask = { title: 'Test title', description: 'Test description' };

      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.byId(1, mockUser);

      expect(result).toBe(mockTask);
      expect(taskRepository.findOne).toHaveBeenCalledWith({ id: 1, user: mockUser });
    });

    it('should throw error as task does not exist', () => {
      taskRepository.findOne.mockRejectedValue(null);
      expect(tasksService.byId(1, mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});

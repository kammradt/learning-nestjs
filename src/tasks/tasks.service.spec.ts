import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TaskFilteredRequest } from './dto/task-filtered-request';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { TaskRequest } from './dto/task-request';

const mockUser = { username: 'Mock User' };

const mockTaskRepository = () => ({
  all: jest.fn(),
  findOne: jest.fn(),
  persist: jest.fn(),
  delete: jest.fn(),
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

  describe('create', () => {
    it('should create a new task', async () => {
      expect(taskRepository.persist).not.toHaveBeenCalled();

      const mockTaskDto: TaskRequest = { title: 'Title!', description: 'Description!' };
      taskRepository.persist.mockResolvedValue({
        title: 'Title!', description: 'Description!', status: TaskStatus.OPEN,
      });

      const result = await tasksService.create(mockTaskDto, mockUser);

      expect(taskRepository.persist).toHaveBeenCalledWith(mockTaskDto, mockUser);
      expect(result.title).toBe(mockTaskDto.title);
      expect(result.description).toBe(mockTaskDto.description);
      expect(result.status).toBe(TaskStatus.OPEN);
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toBeCalled();

      tasksService.delete(1, mockUser);

      expect(taskRepository.delete).toBeCalledWith({ id: 1, user: mockUser });
    });

    it('should throw error as task does not exist', () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });
      expect(tasksService.delete(1, mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});

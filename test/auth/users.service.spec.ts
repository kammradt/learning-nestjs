import { UsersService } from '../../src/auth/users.service';
import { Test } from '@nestjs/testing';
import { UserRepository } from '../../src/auth/user.repository';
import { NotFoundException } from '@nestjs/common';
import { Role } from '../../src/auth/enum/role.enum';

const mockUserRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

const mockUser0 = { id: '0', username: 'Username0' };
const mockUser1 = { id: '1', username: 'Username1' };

describe('UsersService', () => {
  let userRepository;
  let userService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
    userService = await module.get<UsersService>(UsersService);
  });

  describe('getAll', () => {
    it('should get all Users', async () => {
      expect(userRepository.find).not.toHaveBeenCalled();
      const mockValue = [mockUser0, mockUser1];
      userRepository.find.mockResolvedValue(mockValue);

      const users = await userService.getAll();
      expect(users).toBe(mockValue);
      expect(userRepository.find).toBeCalledTimes(1);
    });
  });

  describe('byId', () => {
    it('should get a user by it\'s id', async () => {
      expect(userRepository.findOne).not.toHaveBeenCalled();
      userRepository.findOne.mockResolvedValue(mockUser0);

      const id = mockUser0.id;
      const user = await userService.byId(id);

      expect(userRepository.findOne).toHaveBeenCalledWith({ id });
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(user).toBe(mockUser0);
    });

    it('should throw an NotFoundException', () => {
      expect(userRepository.findOne).not.toHaveBeenCalled();
      userRepository.findOne.mockResolvedValue(null);

      expect(userService.byId(mockUser0.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    const TYPEORM_ENTITY_DELETED = { affected: 1 };
    const TYPEORM_ENTITY_NOT_FOUND = { affected: 0 };

    it('should delete a given user by id', () => {
      expect(userRepository.delete).not.toHaveBeenCalled();
      userRepository.delete.mockResolvedValue(TYPEORM_ENTITY_DELETED);

      const id = mockUser0.id;
      expect(userService.delete(id)).resolves.not.toThrow();
      expect(userRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('should throw an NotFoundException', () => {
      expect(userRepository.delete).not.toHaveBeenCalled();
      userRepository.delete.mockResolvedValue(TYPEORM_ENTITY_NOT_FOUND);

      const id = mockUser0.id;
      expect(userService.delete(id)).rejects.toThrow(NotFoundException);
      expect(userRepository.delete).toHaveBeenCalledWith({ id });
    });
  });

  describe('updateRole', () => {
    it('should update a user role by id', async () => {
      const save = jest.fn().mockResolvedValue(true);
      userService.byId = jest.fn().mockResolvedValue({
        role: Role.REGULAR, save,
      });

      expect(userService.byId).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();

      const result = await userService.updateRole(mockUser0.id, Role.ADMIN);
      expect(userService.byId).toHaveBeenCalledWith(mockUser0.id);
      expect(save).toHaveBeenCalledTimes(1);
      expect(result.role).toBe(Role.ADMIN)

    });
  });
});

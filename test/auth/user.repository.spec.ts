import { UserRepository } from '../../src/auth/user.repository';
import { Test } from '@nestjs/testing';
import { AuthRequest } from '../../src/auth/dto/auth-request';
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../../src/auth/user.entity';
import * as bcrypt from 'bcryptjs';

const mockAuthRequest: AuthRequest = {
  username: 'Username',
  password: 'Password',
};

describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;
    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfully signs up the user', () => {
      save.mockResolvedValue(undefined);
      expect(userRepository.persist(mockAuthRequest)).resolves.not.toThrow();
    });

    it('should throw a conflict exception', () => {
      save.mockRejectedValue();
      expect(userRepository.persist(mockAuthRequest)).rejects.toThrow(ConflictException);
    });

  });

  describe('validatePassword', () => {
    let user;
    beforeEach(() => {
      userRepository.findOne = jest.fn();
      user = new User();
      user.username = mockAuthRequest.username;
      user.hasCorrectPassword = jest.fn();
    });

    it('should return the username with success', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.hasCorrectPassword.mockResolvedValue(true);

      const result = await userRepository.validatePassword(mockAuthRequest);
      expect(result).toBe(mockAuthRequest.username);

    });

    it('should throw an exception if user not found', () => {
      userRepository.findOne.mockResolvedValue(null);

      expect(userRepository.findByUsername(user.username)).rejects.toThrow(NotFoundException);
      expect(user.hasCorrectPassword).not.toHaveBeenCalled();
    });

    it('should throw an exception if password is wrong', () => {
      userRepository.findOne.mockResolvedValue(user);
      user.hasCorrectPassword.mockResolvedValue(false);

      expect(userRepository.validatePassword(mockAuthRequest)).rejects.toThrow(UnauthorizedException);
    });

  });

  describe('hashPassword', () => {
    it('should calls bcrypt.hash and generate', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue('Hash!');
      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await userRepository.hashPassword('pass', 'salt');

      expect(bcrypt.hash).toHaveBeenCalledWith('pass', 'salt');
      expect(result).toBe('Hash!');
    });
  });
});

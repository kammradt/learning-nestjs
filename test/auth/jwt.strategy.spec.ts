import { JwtStrategy } from '../../src/auth/config/jwt.strategy';
import { UserRepository } from '../../src/auth/user.repository';
import { Test } from '@nestjs/testing';
import { User } from '../../src/auth/user.entity';

const mockUserRepository = () => ({
  findByUsername: jest.fn(),
});

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();
    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validatePassword', () => {
    it('should return the User username', async () => {
      const user = new User();
      user.username = 'usernameTest';
      userRepository.findByUsername.mockResolvedValue(user);

      const result = await jwtStrategy.validate({ username: 'usernameTest' });
      expect(userRepository.findByUsername).toHaveBeenCalledWith('usernameTest');
      expect(result.username).toBe(user.username);
    });

  });
});

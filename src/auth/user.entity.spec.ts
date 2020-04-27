import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { doc } from 'prettier';
import breakParent = doc.builders.breakParent;

describe('User entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.salt = 'salt';
    user.password = 'hashed pass';
    bcrypt.hash = jest.fn();
  });

  describe('hasCorrectPassword', () => {
    it('should return true if password is valid', async () => {
      bcrypt.hash.mockReturnValue('hashed pass')
      expect(bcrypt.hash).not.toHaveBeenCalled()

      const result = await user.hasCorrectPassword('pass')
      expect(bcrypt.hash).toHaveBeenCalledWith('pass', 'salt')
      expect(result).toBeTruthy()
    });

    it('should return false if password is invalid', async () => {
      bcrypt.hash.mockReturnValue('wrong pass')
      expect(bcrypt.hash).not.toHaveBeenCalled()

      const result = await user.hasCorrectPassword('pass')
      expect(bcrypt.hash).toHaveBeenCalledWith('pass', 'salt')
      expect(result).toBeFalsy()
    });

  });

});

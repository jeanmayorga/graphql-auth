import bcrypt from 'bcryptjs';

import { generateAccessToken, generateRefreshToken } from '../../libs';
import { logger } from '../../utils';
import { User } from '../users';

export const authMutations = {
  signIn: async (_root: any, options: { email: string; password: string }) => {
    try {
      logger.child({ options }).info('mutation signIn');

      const user = await User.findOne({ where: { email: options.email } });
      if (!user) {
        throw new Error('User not found.');
      }

      const valid = await bcrypt.compare(options.password, user.password);
      if (!valid) {
        throw new Error('Invalid password.');
      }

      const payload = { userId: user.id };

      const accessToken = await generateAccessToken({ payload });
      const refreshToken = await generateRefreshToken({ payload });

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new Error(error);
    }
  },
  signUp: async (
    _root: any,
    options: { firstName: string; lastName: string; email: string; password: string },
  ) => {
    try {
      logger.child({ options }).info('mutation signUp');

      const userExists = await User.findOne({ where: { email: options.email } });
      if (userExists) {
        throw new Error('User already exists.');
      }

      const user = await User.create({
        firstName: options.firstName,
        lastName: options.lastName,
        email: options.email,
        password: options.password,
      });

      const payload = { userId: user.id };

      const accessToken = await generateAccessToken({ payload });
      const refreshToken = await generateRefreshToken({ payload });

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new Error(error);
    }
  },
};

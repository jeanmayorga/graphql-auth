import { AuthenticationError } from 'apollo-server-express';
import { Context } from '../../interfaces';
import { logger } from '../../utils';
import { User } from './model';

export const usersQueries = {
  getMe: async (_root: any, _options: any, context: Context) => {
    try {
      logger.child({ options: context.userId }).info('query getMe');

      if (!context.userId) {
        throw new AuthenticationError('token expired.');
      }

      const user = await User.findByPk(context.userId);

      if (!user) {
        throw new Error('User not found.');
      }

      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
  getUser: async (_root: any, options: { userId: string }, context: Context) => {
    try {
      logger.child({ options }).info('query getUser');

      if (!context.userId) {
        throw new AuthenticationError('token expired.');
      }

      const user = await User.findByPk(options.userId);

      if (!user) {
        throw new Error('User not found.');
      }

      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
};

import { verifyRefreshToken } from '../../libs';
import { logger } from '../../utils';

export const authQueries = {
  getToken: async (_root: any, options: { token: string }) => {
    try {
      logger.child({ options }).info('query getToken');

      const token = options.token;
      if (!token) {
        throw new Error('You need provide a token.');
      }

      const accessToken = verifyRefreshToken({ token });

      return accessToken;
    } catch (error) {
      throw new Error(error);
    }
  },
};

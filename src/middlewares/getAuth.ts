import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import { logger } from '../utils';
import { verifyAccessToken } from '../libs';

export async function getAuth(context: ExpressContext) {
  try {
    const { req } = context;
    const authorization = req.headers['authorization'];

    if (!authorization) {
      return { userId: null };
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return { userId: null };
    }

    const { userId } = await verifyAccessToken({ token });

    logger.child({ userId }).info('middleware getAuth token');

    return { userId };
  } catch (error) {
    return { userId: null };
  }
}

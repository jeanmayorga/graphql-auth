import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import { getAuth, connectDatabase } from '../middlewares';
import { Context } from '../interfaces';

export const context = async (context: ExpressContext): Promise<Context> => {
  const { userId } = await getAuth(context);
  await connectDatabase();

  return { userId };
};

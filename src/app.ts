import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { apolloServerConfig } from './graphql';
import { env } from './config';

export function init() {
  const app = express();

  app.use(
    cors({
      origin: ['http://localhost:8080'],
    }),
  );

  const apolloServer = new ApolloServer(apolloServerConfig);
  apolloServer.applyMiddleware({ app });

  return app;
}

init().listen(3000, () => {
  console.log(`🌎 Environment:`, env.NODE_ENV);
  console.log(`🚀 Graphql server is running on http://localhost:3000/graphql`);
});

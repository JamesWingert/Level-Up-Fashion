/* eslint-disable import/no-anonymous-default-export */
//TODO
import { ApolloServer } from 'apollo-server-micro';
import type { PageConfig } from 'next';

import { createContext } from '../../graphql/context';
import { schema } from '../../graphql/schema';

const apolloServer = new ApolloServer({
  context: createContext,
  schema,
});

const startServer = apolloServer.start();

export default async (req, res) => {
  const allowedOrigins = [
    'https://studio.apollographql.com',
    'https://graphiql-online.com/',
    'http://localhost:3000',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

// Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

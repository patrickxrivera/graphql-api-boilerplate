import express from 'express';
import cors from 'cors';
import { port } from './utils';
import config from './config';
import cookieParser from 'cookie-parser';
import { setupApolloServer } from './setup/apolloServer';

const app = express();

app.use(cors());
app.use(cookieParser());

const apolloServer = setupApolloServer();

apolloServer.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at ${config.baseUrl}${apolloServer.graphqlPath}`,
  ),
);

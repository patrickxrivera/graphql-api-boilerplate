import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { makeSchema, declarativeWrappingPlugin } from '@nexus/schema';
import prisma from '../setup/models';
import permissions from '../services/permissions';
import types from '../types';

export const setupApolloServer = () => {
  return new ApolloServer({
    schema: applyMiddleware(
      makeSchema({
        types,
        plugins: [nexusPrisma(), declarativeWrappingPlugin()],
        outputs: {
          schema: __dirname + '/../schema.graphql',
          typegen: __dirname + '/generated/nexus.ts',
        },
      }),
      permissions,
    ),
    context: (request) => {
      return {
        ...request,
        prisma,
      };
    },
    introspection: true,
    playground: true,
  });
};

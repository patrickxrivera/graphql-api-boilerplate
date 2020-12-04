const { ApolloServer } = require('apollo-server');
const { applyMiddleware } = require('graphql-middleware');
const { nexusPrisma } = require('nexus-plugin-prisma');
const { makeSchema, declarativeWrappingPlugin } = require('@nexus/schema');
const prisma = require('./setup/models');
const { permissions } = require('./services/permissions');
const types = require('./types');

const port = process.env.PORT || 5000;

const server = new ApolloServer({
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

server
    .listen({ port })
    .then(({ url }) =>
        console.log(
            `🚀 Server ready at: ${url}\n⭐️ See sample queries: http://pris.ly/e/js/graphql-auth#using-the-graphql-api`,
        ),
    );

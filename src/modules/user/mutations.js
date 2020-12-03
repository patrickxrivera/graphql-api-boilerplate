const { stringArg } = require('@nexus/schema')

const { login: loginResolver, signup: signupResolver } = require('./resolvers')

const signup = {
  type: 'AuthPayload',
  args: {
    name: stringArg({ nullable: true }),
    email: stringArg(),
    password: stringArg(),
  },
  resolve: signupResolver,
}

const login = {
  type: 'AuthPayload',
  args: {
    email: stringArg(),
    password: stringArg(),
  },
  resolve: loginResolver,
}

module.exports = {
  signup,
  login,
}

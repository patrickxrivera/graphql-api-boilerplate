import { stringArg } from '@nexus/schema';
import { loginResolver, signUpResolver } from './resolvers';

const signUp = {
  type: 'AuthPayload',
  args: {
    name: stringArg({ nullable: true }),
    email: stringArg(),
    password: stringArg(),
  },
  resolve: signUpResolver,
};

const login = {
  type: 'AuthPayload',
  args: {
    email: stringArg(),
    password: stringArg(),
  },
  resolve: loginResolver,
};

export default {
  signUp,
  login,
};

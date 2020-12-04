import { stringArg } from '@nexus/schema';
import {
  loginResolver,
  signUpResolver,
  refreshTokenResolver,
} from './resolvers';

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

const refreshToken = {
  type: 'AuthPayload',
  resolve: refreshTokenResolver,
};

export default {
  signUp,
  login,
  refreshToken,
};

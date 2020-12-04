import { stringArg } from '@nexus/schema';
import {
  loginResolver,
  signUpResolver,
  refreshTokenResolver,
  logoutResolver,
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

const logout = {
  type: 'LogoutPayload',
  resolve: logoutResolver,
};

export default {
  signUp,
  login,
  refreshToken,
  logout,
};

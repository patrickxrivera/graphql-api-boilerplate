import { compare, hash } from 'bcryptjs';
import models from '../../setup/models';
import { getUserId, isProd } from '../../utils';
import AuthService from '../../services/auth';

export const loginResolver = async (parent, { email, password }, ctx) => {
  const user = await models.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error(`No user found for email: ${email}`);
  }

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  const userData = { userId: user.id };

  await AuthService.updateRefreshToken({
    userData,
    ctx,
  });

  return {
    token: AuthService.generateJWT(userData),
    tokenExpiry: AuthService.getTokenExpiry(),
    user,
  };
};

export const signUpResolver = async (
  parent,
  { name, email, password },
  ctx,
) => {
  const hashedPassword = await hash(password, 10);

  const user = await models.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const userData = { userId: user.id };

  await AuthService.createRefreshToken({
    userData,
    ctx,
  });

  return {
    token: AuthService.generateJWT({ userId: user.id }),
    tokenExpiry: AuthService.getTokenExpiry(),
    user,
  };
};

export const meResolver = (parent, args, ctx) => {
  const userId = getUserId(ctx);
  return models.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const refreshTokenResolver = async (parent, args, ctx) => {
  const refreshToken = ctx.req.cookies && ctx.req.cookies['refresh_token'];

  if (!refreshToken) {
    throw new Error('Did not receive refresh token.');
  }

  const refreshTokenRecord = await models.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });

  if (!refreshTokenRecord) {
    throw new Error("Refresh token doesn't exist.");
  }

  const userData = { userId: refreshTokenRecord.user.id };

  await AuthService.updateRefreshToken({
    userData,
    ctx,
  });

  return {
    token: AuthService.generateJWT(userData),
    tokenExpiry: AuthService.getTokenExpiry(),
    user: refreshTokenRecord.user,
  };
};

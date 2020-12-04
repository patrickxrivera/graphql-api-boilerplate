import { compare, hash } from 'bcryptjs';
import models from '../../setup/models';
import { getUserId } from '../../utils';
import JWTService from '../../services/jwt';

export const loginResolver = async (parent, { email, password }, context) => {
  const user = await models.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error(`No user found for email: ${email}`);
  }

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  return {
    token: JWTService.sign({ userId: user.id }),
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
  return {
    token: JWTService.sign({ userId: user.id }),
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

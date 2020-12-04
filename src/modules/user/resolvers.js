import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import models from '../../setup/models';
import { getUserId } from '../../utils';
import config from '../../config';

const login = async (parent, { email, password }, context) => {
  const user = await models.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error(`No user found for email: ${email}`);
  }

  const passwordValid = await compare(password, user.password);

  if (!passwordValid) {
    throw new Error('Invalid password');
  }

  return {
    token: sign({ userId: user.id }, config.appSecret),
    user,
  };
};

const signup = async (parent, { name, email, password }, ctx) => {
  const hashedPassword = await hash(password, 10);
  const user = await models.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return {
    token: sign({ userId: user.id }, config.appSecret),
    user,
  };
};

const me = (parent, args, ctx) => {
  const userId = getUserId(ctx);
  return models.user.findUnique({
    where: {
      id: userId,
    },
  });
};

module.exports = {
  login,
  signup,
  me,
};

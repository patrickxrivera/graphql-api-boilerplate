import jwt, { TokenExpiredError } from 'jsonwebtoken';

export const isProd = () => process.env.NODE_ENV === 'production';

const config = require('../config');

const isValidToken = (token) => {
  if (!token) {
    return false;
  }

  // exp is in seconds but JS uses milliseconds
  const tokenExpirationDate = new Date(token.exp * 1000);
  const currentTimestamp = new Date();

  if (currentTimestamp > tokenExpirationDate) {
    throw new Error('Token is expired');
  }

  return true;
};

export const getUserId = (ctx) => {
  const Authorization = ctx.req.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');

    const verifiedToken = jwt.verify(token, config.appSecret);

    if (isValidToken(verifiedToken)) {
      return verifiedToken.userId;
    }
  }
};

export const port = process.env.PORT || 5000;

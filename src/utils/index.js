import { verify } from 'jsonwebtoken';

export const isProd = () => process.env.NODE_ENV === 'production';

const config = require('../config');

export const getUserId = (context) => {
  const Authorization = context.req.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');

    const verifiedToken = verify(token, config.appSecret);

    return verifiedToken && verifiedToken.userId;
  }
};

export const port = process.env.PORT || 5000;

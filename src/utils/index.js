const { verify } = require('jsonwebtoken');

export const APP_SECRET = 'appsecret321';

export const getUserId = (context) => {
  const Authorization = context.req.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET);
    return verifiedToken && verifiedToken.userId;
  }
};

export const port = process.env.PORT || 5000;

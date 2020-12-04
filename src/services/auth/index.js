import jwt from 'jsonwebtoken';
import config from '../../config';
import models from '../../setup/models';
import { isProd, timeFromNow } from '../../utils';
import { TIME } from '../../utils/constants';

class AuthService {
  static async createRefreshToken({ userData, ctx }) {
    const refreshToken = AuthService.generateRefreshToken(userData);

    await models.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userData.userId,
      },
    });

    AuthService.setRefreshTokenCookie(refreshToken, ctx);
  }

  static async updateRefreshToken({ userData, ctx }) {
    const refreshToken = AuthService.generateRefreshToken(userData);

    await models.refreshToken.update({
      where: {
        userId: userData.userId,
      },
      data: {
        token: refreshToken,
      },
    });

    console.log({ refreshToken, userData });

    AuthService.setRefreshTokenCookie(refreshToken, ctx);
  }

  static setRefreshTokenCookie(refreshToken, ctx) {
    ctx.res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProd(), // requires https
    });
  }

  static generateJWT(data) {
    return jwt.sign(data, config.appSecret, {
      // TODO: move to config
      expiresIn: '1h',
    });
  }

  static generateRefreshToken(data) {
    return jwt.sign(data, config.appSecret);
  }

  static getTokenExpiry() {
    const timestamp = timeFromNow(TIME.ONE_HOUR);
    return timestamp.toString();
  }
}

export default AuthService;

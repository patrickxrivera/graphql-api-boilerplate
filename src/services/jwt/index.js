import jwt from 'jsonwebtoken';
import config from '../../config';

class JWTService {
  static sign(data) {
    return jwt.sign(data, config.appSecret, {
      // TODO: move to config
      expiresIn: '1h',
    });
  }
}

export default JWTService;

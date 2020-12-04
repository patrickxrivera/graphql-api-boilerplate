import productionConfig from './production';
import developmentConfig from './development';
import sharedConfig from './shared';
import { isProd } from '../utils';

const config = isProd() ? productionConfig : developmentConfig;

module.exports = {
  ...sharedConfig,
  ...config,
};

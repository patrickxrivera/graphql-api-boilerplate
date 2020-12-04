import { meResolver } from './resolvers';

const me = {
  type: 'User',
  nullable: true,
  resolve: meResolver,
};

export default {
  me,
};

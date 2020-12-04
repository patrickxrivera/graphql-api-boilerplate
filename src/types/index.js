import userTypes from '../modules/user/types';
import postTypes from '../modules/post/types';
import mutationTypes from './Mutation';
import queryTypes from './Query';

export default {
  ...queryTypes,
  ...mutationTypes,
  ...userTypes,
  ...postTypes,
};

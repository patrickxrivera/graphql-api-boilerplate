import { idArg, stringArg } from '@nexus/schema';
import { getFeed, getFilteredPosts, getPostByIdResolver } from './resolvers';

const feed = {
  type: 'Post',
  resolve: getFeed,
};

const filterPosts = {
  type: 'Post',
  args: {
    searchString: stringArg({ nullable: true }),
  },
  resolve: getFilteredPosts,
};

const getPostById = {
  type: 'Post',
  nullable: true,
  args: { id: idArg() },
  resolve: getPostByIdResolver,
};

export default {
  feed,
  filterPosts,
  getPostById,
};

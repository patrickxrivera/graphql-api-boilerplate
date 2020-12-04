import { idArg, stringArg } from '@nexus/schema';
import { getFeed, getFilteredPosts, getPostByIdResolver } from './resolvers';

export const feed = {
  type: 'Post',
  resolve: getFeed,
};

export const filterPosts = {
  type: 'Post',
  args: {
    searchString: stringArg({ nullable: true }),
  },
  resolve: getFilteredPosts,
};

export const getPostById = {
  type: 'Post',
  nullable: true,
  args: { id: idArg() },
  resolve: getPostByIdResolver,
};

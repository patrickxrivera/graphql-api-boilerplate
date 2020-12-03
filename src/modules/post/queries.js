const { idArg, stringArg } = require('@nexus/schema')
const {
  feed: feedResolver,
  filterPosts: filterPostsResolver,
  getPostById: getPostByIdResolver,
} = require('./resolvers')

const feed = {
  type: 'Post',
  resolve: feedResolver,
}

const filterPosts = {
  type: 'Post',
  args: {
    searchString: stringArg({ nullable: true }),
  },
  resolve: filterPostsResolver,
}

const getPostById = {
  type: 'Post',
  nullable: true,
  args: { id: idArg() },
  resolve: getPostByIdResolver,
}

module.exports = {
  feed,
  filterPosts,
  getPostById,
}

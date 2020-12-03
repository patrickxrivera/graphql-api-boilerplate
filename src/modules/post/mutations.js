const { stringArg, idArg } = require('@nexus/schema')
const {
  createDraft: createDraftResolver,
  deletePost: deletePostResolver,
  publish: publishResolver,
  createPost: createPostResolver,
} = require('./resolvers')

const createDraft = {
  type: 'Post',
  args: {
    title: stringArg(),
    content: stringArg({ nullable: true }),
  },
  resolve: createDraftResolver,
}

const deletePost = {
  type: 'Post',
  nullable: true,
  args: { id: idArg() },
  resolve: deletePostResolver,
}

const publish = {
  type: 'Post',
  nullable: true,
  args: { id: idArg() },
  resolve: publishResolver,
}

const createPost = {
  type: 'Post',
  args: {
    title: stringArg(),
    content: stringArg({ nullable: true }),
  },
  resolve: createPostResolver,
}

module.exports = {
  createDraft,
  deletePost,
  publish,
  createPost,
}

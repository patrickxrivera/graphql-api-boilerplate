const { getUserId } = require('../../utils')
const models = require('../../setup/models')

const createDraft = (parent, { title, content }, ctx) => {
  const userId = getUserId(ctx)
  return models.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { id: Number(userId) } },
    },
  })
}

const deletePost = (parent, { id }, ctx) => {
  return models.post.delete({
    where: { id: Number(id) },
  })
}

const publish = (parent, { id }, ctx) => {
  return models.post.update({
    where: { id: Number(id) },
    data: { published: true },
  })
}

const feed = (parent, args, ctx) => {
  return models.post.findMany({
    where: { published: true },
  })
}

const filterPosts = (parent, { searchString }, ctx) => {
  return models.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchString,
          },
        },
        {
          content: {
            contains: searchString,
          },
        },
      ],
    },
  })
}

const createPost = async (parent, { title, content }, ctx) => {
  const userId = getUserId(ctx)

  return models.post.create({
    data: {
      title,
      content,
      published: true,
      author: { connect: { id: Number(userId) } },
    },
  })
}

const getPostById = (parent, { id }, ctx) => {
  return models.post.findOne({
    where: {
      id: Number(id),
    },
  })
}

module.exports = {
  createDraft,
  deletePost,
  publish,
  feed,
  filterPosts,
  getPostById,
  createPost,
}

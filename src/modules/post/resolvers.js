import models from '../../setup/models';
import { getUserId } from '../../utils';

export const createDraft = (parent, { title, content }, ctx) => {
  const userId = getUserId(ctx);
  return models.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { id: Number(userId) } },
    },
  });
};

export const deletePost = (parent, { id }, ctx) => {
  return models.post.delete({
    where: { id: Number(id) },
  });
};

export const publish = (parent, { id }, ctx) => {
  return models.post.update({
    where: { id: Number(id) },
    data: { published: true },
  });
};

export const getFeed = (parent, args, ctx) => {
  return models.post.findMany({
    where: { published: true },
  });
};

export const getFilteredPosts = (parent, { searchString }, ctx) => {
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
  });
};

export const createPost = async (parent, { title, content }, ctx) => {
  const userId = getUserId(ctx);

  return models.post.create({
    data: {
      title,
      content,
      published: true,
      author: { connect: { id: Number(userId) } },
    },
  });
};

export const getPostByIdResolver = (parent, { id }, ctx) => {
  return models.post.findUnique({
    where: {
      id: Number(id),
    },
  });
};

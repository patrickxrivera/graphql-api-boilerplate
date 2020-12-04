import { rule, shield } from 'graphql-shield';
import { getUserId } from '../../utils';
import models from '../../setup/models';

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    try {
      const userId = getUserId(context);
      return Boolean(userId);
    } catch (err) {
      return err.message;
    }
  }),
  isPostOwner: rule()(async (parent, { id }, context) => {
    try {
      const userId = getUserId(context);
      const author = await models.post
        .findUnique({
          where: {
            id: Number(id),
          },
        })
        .author();
      return userId === author.id;
    } catch (err) {
      return err.message;
    }
  }),
};

const permissions = shield(
  {
    Query: {
      me: rules.isAuthenticatedUser,
      filterPosts: rules.isAuthenticatedUser,
      getPostById: rules.isAuthenticatedUser,
    },
    Mutation: {
      createDraft: rules.isAuthenticatedUser,
      deletePost: rules.isPostOwner,
      publish: rules.isPostOwner,
    },
  },
  {
    allowExternalErrors: true,
  },
);

export default permissions;

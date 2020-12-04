import { mutationType } from '@nexus/schema';
import user from '../modules/user/mutations';
import post from '../modules/post/mutations';

const Mutation = mutationType({
  definition(t) {
    t.field('signUp', user.signUp);
    t.field('login', user.login);
    t.field('refreshToken', user.refreshToken);
    t.field('logout', user.logout);

    t.field('createDraft', post.createDraft);
    t.field('deletePost', post.deletePost);
    t.field('publish', post.publish);
    t.field('createPost', post.createPost);
  },
});

export default { Mutation };

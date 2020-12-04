import { queryType } from '@nexus/schema';
import user from '../modules/user/queries';
import post from '../modules/post/queries';

const Query = queryType({
  definition(t) {
    t.field('me', user.me);

    t.list.field('feed', post.feed);
    t.list.field('filterPosts', post.filterPosts);
    t.field('getPostById', post.getPostById);
  },
});

export default { Query };

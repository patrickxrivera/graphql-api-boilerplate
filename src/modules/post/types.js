import { objectType } from '@nexus/schema';

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.published();
    t.model.title();
    t.model.content();
    t.model.author();
  },
});

export default { Post };

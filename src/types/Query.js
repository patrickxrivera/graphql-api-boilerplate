const { queryType } = require('@nexus/schema')
const user = require('../modules/user/queries')
const post = require('../modules/post/queries')

const Query = queryType({
  definition(t) {
    t.field('me', user.me)

    t.list.field('feed', post.feed)
    t.list.field('filterPosts', post.filterPosts)
    t.field('getPostById', post.getPostById)
  },
})

module.exports = {
  Query,
}

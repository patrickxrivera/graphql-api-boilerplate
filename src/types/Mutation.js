const { mutationType } = require('@nexus/schema')
const user = require('../modules/user/mutations')
const post = require('../modules/post/mutations')

const Mutation = mutationType({
  definition(t) {
    t.field('signup', user.signup)
    t.field('login', user.login)

    t.field('createDraft', post.createDraft)
    t.field('deletePost', post.deletePost)
    t.field('publish', post.publish)
    t.field('createPost', post.createPost)
  },
})

module.exports = {
  Mutation,
}

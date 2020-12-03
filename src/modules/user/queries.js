const { me: meResolver } = require('./resolvers')

const me = {
  type: 'User',
  nullable: true,
  resolve: meResolver,
}

module.exports = {
  me,
}

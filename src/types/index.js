const userTypes = require('../modules/user/types')
const postTypes = require('../modules/post/types')
const mutationTypes = require('./Mutation')
const queryTypes = require('./Query')

module.exports = {
  ...userTypes,
  ...mutationTypes,
  ...queryTypes,
  ...postTypes,
}

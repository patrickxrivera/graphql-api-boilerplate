/* eslint-disable camelcase */

exports.shorthands = undefined

const tableName = 'users'

exports.up = (pgm) => {
  pgm.createTable(tableName, {
    id: 'id',
    email: {
      type: 'varchar(255)',
      unique: true,
      notNull: true,
    },
    name: 'varchar(255)',
    password: {
      type: 'varchar(255)',
      notNull: true,
    },
  })
}

exports.down = (pgm) => {
  pgm.dropTable(tableName)
}

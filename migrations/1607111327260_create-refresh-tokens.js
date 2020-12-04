/* eslint-disable camelcase */

exports.shorthands = undefined;

const tableName = 'refreshTokens';

exports.up = (pgm) => {
  pgm.createTable(tableName, {
    id: 'id',
    token: 'varchar(255)',
    userId: {
      type: 'integer',
      unique: true,
      notNull: true,
      references: 'users',
    },
    revokedAt: 'timestamp',
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable(tableName);
};

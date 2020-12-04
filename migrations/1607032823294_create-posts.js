/* eslint-disable camelcase */

exports.shorthands = undefined;

const tableName = 'posts';

exports.up = (pgm) => {
  pgm.createTable(tableName, {
    id: 'id',
    content: 'text',
    published: {
      type: 'boolean',
      default: false,
      notNull: true,
    },
    title: {
      type: 'varchar(255)',
      notNull: true,
    },
    authorId: {
      type: 'integer',
      notNull: true,
      references: 'users',
    },
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

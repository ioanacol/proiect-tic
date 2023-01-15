const create = require('./create');
const readMany = require('./read-many');
const readOne = require('./read-one');
const remove = require('./remove');
const update = require('./update');

const createComment = require('./create-comment');
const readManyComments = require('./read-many-comments');
const readOneComment = require('./read-one-comment');
const removeComment = require('./remove-comment');
const updateComment = require('./update-comment');

module.exports = {
  create,
  readMany,
  readOne,
  remove,
  update,
  createComment,
  readManyComments,
  readOneComment,
  removeComment,
  updateComment,
};

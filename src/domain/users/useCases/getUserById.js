const User = require('../models/user');

function buildGetUserById() {
  return async function getUserById(userId) {
    return User.findOne({ _id: userId });
  };
}

module.exports = buildGetUserById;

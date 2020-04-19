const User = require('../../users/models/user');

function buildCategories() {
  return function categories() {
    return User.getCategories();
  };
}

module.exports = buildCategories;

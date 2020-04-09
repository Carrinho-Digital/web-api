const User = require('../models/user');

function buildUpdateUser({ encrypt }) {
  return async function updateUser(userId, userData) {
    const user = {...userData};

    if (!User.isValidType(userData.type)) {
      throw new Error('Invalid type');
    }

    user.updatedAt = Date.now();

    return User.findByIdAndUpdate(userId, user);
  };
}

module.exports = buildUpdateUser;

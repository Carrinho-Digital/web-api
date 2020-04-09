const User = require('../models/user');

function buildRemoveUser() {
  return async function removeUser(userId) {
    const user = await User.findById(userId);

    user.delete();

    return User.findByIdAndUpdate(userId, user);
  };
}

module.exports = buildRemoveUser;

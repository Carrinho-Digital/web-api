const User = require('../models/user');
const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildGetUserById() {
  return async function getUserById(userId) {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundException('User cannot be found');
    }

    return user;
  };
}

module.exports = buildGetUserById;

const User = require('../models/user');

function buildGetAddresses() {
  return async function getAddresses(userId) {
    const user = await User.findOne({ _id: userId });
    return user.addresses;
  };
}

module.exports = buildGetAddresses;

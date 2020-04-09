const User = require('../models/user');
const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildRemoveUserAddress() {
  return async function removeUserAddress(addressId, userId) {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundException('User could not be found', 404);
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      throw new NotFoundException('Address could not be found', 404);
    }

    address.remove();

    await user.save();
  };
}

module.exports = buildRemoveUserAddress;



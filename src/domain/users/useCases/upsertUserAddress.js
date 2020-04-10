const User = require('../models/user');

const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildUpsertUserAddress() {
  return async function upsertUserAddress(addressId, addressValues, userId) {
    if (addressId) {
      const updatedValue = await User.findOneAndUpdate(
        { '_id': userId, 'addresses._id': addressId },
        {
          '$set': {
            'addresses.$': {...addressValues, _id: addressId },
          },
        },
      );

      if (!updatedValue) {
        throw new NotFoundException('Address could not be found', 404);
      }
    } else {
      const user = await User.findOne({ _id: userId });

      if (!user) {
        throw new NotFoundException('User could not be found', 404);
      }

      user.addresses.push(addressValues);

      await user.save();
    }
  };
}

module.exports = buildUpsertUserAddress;

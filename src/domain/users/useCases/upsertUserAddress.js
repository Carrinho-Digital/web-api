const User = require('../models/user');

const {
  NotFound: NotFoundException,
  General: GeneralException,
} = require('../../../exceptions');

function buildUpsertUserAddress() {
  return async function upsertUserAddress(
    addressId,
    addressValues,
    userId,
    isMarket,
  ) {
    if (addressId) {
      const updatedValue = await User.findOneAndUpdate(
        { '_id': userId, 'addresses._id': addressId },
        {
          '$set': {
            'addresses.$': addressValues,
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

      if (isMarket && user.addresses.length > 0) {
        throw new GeneralException('Markets cannot add more then 1 address');
      }

      user.addresses.push(addressValues);

      await user.save();
    }
  };
}

module.exports = buildUpsertUserAddress;

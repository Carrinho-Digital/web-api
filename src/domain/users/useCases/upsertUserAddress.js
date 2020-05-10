const User = require('../models/user');

const {
  NotFound: NotFoundException,
  General: GeneralException,
} = require('../../../exceptions');

function buildUpsertUserAddress() {
  function getNewestAddress(user) {
    const addresses = [...user.addresses];

    if (addresses.length < 1) return null;
    return addresses[addresses.length - 1];
  }

  return async function upsertUserAddress(
    addressId,
    addressValues,
    userId,
    isMarket,
  ) {
    if (addressId) {
      const { value: updatedValue } = await User.findOneAndUpdate(
        { '_id': userId, 'addresses._id': addressId },
        {
          '$set': {
            'addresses.$': {...addressValues, _id: addressId },
          },
        },
        {
          new: true,
          upsert: false,
          rawResult: true,
        },
      );

      if (!updatedValue) {
        throw new NotFoundException('Address could not be found', 404);
      }

      return getNewestAddress(updatedValue);
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

      return getNewestAddress(user);
    }
  };
}

module.exports = buildUpsertUserAddress;

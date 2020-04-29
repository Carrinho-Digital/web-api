const moment = require('moment');
const User = require('../../users/models/user');
const {
  General: GeneralException,
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildUpsertDeliveryAvailability({
  getUserById,
}) {
  function isAvailabilityValid(availability) {
    return availability.from.isBefore(availability.to);
  }

  function normalizeAvailability(availability) {
    const to = moment(availability.to, 'HH:mm:ss').utc();
    const from = moment(availability.from, 'HH:mm:ss').utc();

    return {
      to,
      from,
    };
  }

  return async function upsertDeliveryAvailability(
    deliveryAvailiabilityId = null,
    marketId,
    dayOfWeek,
    availabilities = [],
  ) {
    if (!User.isValidDayOfWeek(dayOfWeek)) {
      throw new GeneralException('dayOfWeek invalid', 422);
    }

    const normalizedAvailabilities = availabilities.map(normalizeAvailability);

    const isAvailabilitiesValid = normalizedAvailabilities
      .every(isAvailabilityValid);

    if (!isAvailabilitiesValid) {
      throw new GeneralException('The availabilities are not valid', 422);
    }

    const marketUser = await getUserById(marketId);

    const marketDeliveryAvailabilities = marketUser
      .deliveryAvailabilities || [];

    if (!deliveryAvailiabilityId) {
      const availabilityExists = marketDeliveryAvailabilities
        .some(availability => availability.dayOfWeek === dayOfWeek);

      if (availabilityExists) {
        throw new GeneralException('Delivery availability already exists', 422);
      }

      marketUser.deliveryAvailabilities.push({
        dayOfWeek,
        normalizedAvailabilities,
      });

      return marketUser.save();
    }

    const availabilityExists = marketDeliveryAvailabilities
      .some(availability =>
        availability.dayOfWeek === dayOfWeek &&
        availability.id !== deliveryAvailiabilityId);

    if (availabilityExists) {
      throw new GeneralException('Delivery availability already exists', 422);
    }

    const updatedAvailability = await User.findOneAndUpdate(
      {
        '_id': marketId,
        'deliveryAvailabilities._id': deliveryAvailiabilityId,
      },
      {
        '$set': {
          'deliveryAvailabilities.$': {
            dayOfWeek,
            _id: deliveryAvailiabilityId,
            availabilities: [...normalizedAvailabilities],
          },
        },
      },
    );

    if (!updatedAvailability) {
      throw new NotFoundException('Delivery availability not found');
    }

    return updatedAvailability;
  };
}

module.exports = buildUpsertDeliveryAvailability;

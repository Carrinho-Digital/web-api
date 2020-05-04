const {
  General: GeneralException,
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildAvailability({
  getCurrentCartByMarket,
  getDeliveryAvailabilities,
}) {
  return async function availability(
    marketId,
    userId,
    {
      availability,
      availabilityTime,
    },
  ) {
    if (!availability || !availabilityTime) {
      throw new GeneralException(
        'Market availability and availability time are required', 400);
    }

    const marketAvailabilities = await getDeliveryAvailabilities(marketId);

    const selectedAvailability = marketAvailabilities.find(marketAvailability =>
      marketAvailability._id.toString() === availability.toString());

    if (!selectedAvailability) {
      throw new NotFoundException('Availability could not be found');
    }

    const selectedAvailabilityTime = selectedAvailability
      .availabilities.find(
        time => time._id.toString() === availabilityTime.toString());

    if (!selectedAvailabilityTime) {
      throw new NotFoundException('Availability time could not be found');
    }

    const { dayOfWeek } = selectedAvailability;
    const { from, to } = selectedAvailabilityTime;

    const { cart: currentCart } = await getCurrentCartByMarket(
      marketId,
      userId,
    );

    if (!currentCart) {
      throw new NotFoundException('Cart not found');
    }

    currentCart.availability = {
      to,
      from,
      dayOfWeek,
    };

    currentCart.updatedAt = new Date();

    return currentCart.save();
  };
}

module.exports = buildAvailability;

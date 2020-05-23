const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildDeleteDeliveryAvalability({
  getUserById,
}) {
  return async function deleteDeliveryAvalability(avalabilityId, marketId) {
    const marketUser = await getUserById(marketId);

    const availability = marketUser.deliveryAvailabilities.id(avalabilityId);

    if (!availability) {
      throw new NotFoundException('Availability not found');
    }

    availability.remove();

    await marketUser.save();
  };
}

module.exports = buildDeleteDeliveryAvalability;

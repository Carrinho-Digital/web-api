const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildGetDeliveryAvailabilityById({
  getDeliveryAvailabilities,
}) {
  return async function getDeliveryAvailabilityById(marketId, availabilityId) {
    const availabilities = await getDeliveryAvailabilities(marketId);

    const availability = availabilities.find(
      ({ _id }) => availabilityId === _id.toString());

    if (!availability) {
      throw new NotFoundException('Cannot fint availability');
    }

    return availability;
  };
}

module.exports = buildGetDeliveryAvailabilityById;

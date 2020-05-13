const { googleDistanceMatrix } = require('../../../lib/maps');

const {
  General: GeneralException,
  MarketHasNotAddress: MarketHasNotAddressException,
} = require('../../../exceptions');

function buildDeliveryDistance({
  getUserById,
  getAddressById,
}) {
  async function getDistanceByGoogleMatrix(coordinatesA, coordinatesB) {
    const { data: { rows } } = await googleDistanceMatrix(
      coordinatesA,
      coordinatesB,
    );

    const rowsHasElements = rows.length > 0;

    if (!rowsHasElements) return 0;

    const distanceElements = rows[0].elements;

    const elementsHasDistances = distanceElements.length > 0;

    if (!elementsHasDistances) return 0;

    const distanceInMeters = distanceElements[0].distance.value;

    return distanceInMeters;
  }

  return async function deliveryDistance(addressToDelivery, userId, marketId) {
    const market = await getUserById(marketId);
    const marketHasAddress = market.addresses.length > 0;

    if (!marketHasAddress) {
      throw new MarketHasNotAddressException();
    }

    try {
      const marketAddress = market.addresses[0];

      const customerAddressToDelivery = await getAddressById(
        addressToDelivery.toString(),
        userId,
      );

      const marketAddressCoordinates = {
        latX: marketAddress.latitude,
        longX: marketAddress.longitude,
      };

      const customerAddressCoordinates = {
        latY: customerAddressToDelivery.latitude,
        longY: customerAddressToDelivery.longitude,
      };

      const distanceInMeters = await getDistanceByGoogleMatrix(
        marketAddressCoordinates,
        customerAddressCoordinates,
      );

      return distanceInMeters;
    } catch (exceptions) {
      throw new GeneralException(
        'Cannot calculate a delivery price',
        500,
      );
    }
  };
}

module.exports = buildDeliveryDistance;

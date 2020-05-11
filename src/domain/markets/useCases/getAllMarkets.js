const User = require('../../users/models/user');
const { distanceBetweenCoordinates } = require('../../../lib/maps');

function buildGetAllMarkets(paginate) {
  const MARKET_TYPE = 'MARKET_USER';

  function calculateDistanceFromCustomer(market, userAddress) {
    const hasAddresses = Array.isArray(market.addresses) &&
      market.addresses.length > 0;

    if (!hasAddresses) return 0;

    const address = market.addresses[0];

    const marketLatAndLong = {
      latY: address.latitude,
      longY: address.longitude,
    };

    const userLatAndLong = {
      latX: userAddress.latitude,
      longX: userAddress.longitude,
    };

    try {
      return distanceBetweenCoordinates(
        userLatAndLong,
        marketLatAndLong,
      );
    } catch (exception) {
      return 0;
    }
  }

  return async function getAllMarkets(
    searchParams = { limit: 10, page: 0, query: {} },
    userAddress,
  ) {
    const marketQuery = {
      ...searchParams.query,
      'type': MARKET_TYPE,
      'isDeleted': false,
      'addresses.city': userAddress.city,
      'addresses.state': userAddress.state,
      'addresses.country': userAddress.country,
    };

    const markets = await User.find(
      marketQuery,
      'name email document phones addresses online category',
      {
        skip: searchParams.limit * searchParams.page,
        limit: searchParams.limit,
      },
    );

    const marketsWithDistances = markets
      .map(market => ({
        ...market.toObject(),
        distance: calculateDistanceFromCustomer(market, userAddress),
      }));

    const paginatedMarkets = await paginate(
      marketsWithDistances,
      {
        ...searchParams,
        query: marketQuery,
      },
      User,
    );

    return paginatedMarkets;
  };
}

module.exports = buildGetAllMarkets;

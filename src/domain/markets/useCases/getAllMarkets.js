const User = require('../../users/models/user');

function buildGetAllMarkets(paginate) {
  const MARKET_TYPE = 'MARKET_USER';

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

    const paginatedMarkets = await paginate(
      markets,
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

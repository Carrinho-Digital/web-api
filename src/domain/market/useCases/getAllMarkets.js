const User = require('../../users/models/user');

function buildGetAllMarkets(paginate) {
  const MARKET_TYPE = 'MARKET_USER';

  return async function getAllMarkets(
    searchParams = { limit: 10, page: 0, query: {} },
  ) {
    const marketQuery = {
      ...searchParams.query,
      type: MARKET_TYPE,
    };

    const markets = await User.find(
      marketQuery,
      'name email document phones addresses online',
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

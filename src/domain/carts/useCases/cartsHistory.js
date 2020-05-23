const { Cart } = require('../models/cart');

function buildCartsHistory({
  paginate,
}) {
  return async function cartHistory(
    userId,
    searchParams = { limit: 10, page: 0, query: {} },
  ) {
    const cartHistoryQuery = {
      ...searchParams.query,
      user: userId,
      closed: true,
    };

    const allCarts = await Cart.find(
      cartHistoryQuery,
      // eslint-disable-next-line max-len
      'availability market closed updatedAt createdAt products delivery payment total',
      {
        skip: searchParams.limit * searchParams.page,
        limit: searchParams.limit,
      },
    );

    const paginatedCartHistory = await paginate(
      allCarts,
      {
        ...searchParams,
        query: cartHistoryQuery,
      },
      Cart,
    );

    return paginatedCartHistory;
  };
}

module.exports = buildCartsHistory;

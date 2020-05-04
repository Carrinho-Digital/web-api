const { Promotion } = require('../models/promotion');

function buildGetPromotions({
  paginate,
}) {
  return async function getPromotions(
    marketId, searchParams = {
      limit: 10,
      page: 0,
      query: {},
    },
  ) {
    const promotionQuery = {
      ...searchParams.query,
      market: marketId,
    };

    const promotions = await Promotion.find(
      promotionQuery,
      null,
      {
        skip: searchParams.limit * searchParams.page,
        limit: searchParams.limit,
      },
    ).populate('product', '_id name');

    return paginate(
      promotions,
      {
        ...searchParams,
        query: promotionQuery,
      },
      Promotion,
    );
  };
}

module.exports = buildGetPromotions;

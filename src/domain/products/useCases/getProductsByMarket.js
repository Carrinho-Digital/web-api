const { Product } = require('../models/product');

function buildGetProductsByMarket(paginate) {
  return async function getProductsByMarket(
    marketId, searchParams = { limit: 5, page: 0, query: {} }) {
    const customerQuery = {
      ...searchParams.query,
      market: marketId,
      isDeleted: false,
      inactive: false,
    };

    const products = await Product.find(
      customerQuery,
      'name description sellPrice size unit promotions amount tags',
      {
        skip: searchParams.limit * searchParams.page,
        limit: searchParams.limit,
      },
    ).populate('market', 'name phones email');

    return paginate(
      products,
      {
        ...searchParams,
        query: customerQuery,
      },
      Product,
    );
  };
}

module.exports = buildGetProductsByMarket;

const { Product } = require('../models/product');

function buildGetAllProducts(paginate) {
  return async function getAllProducts(
    marketId,
    searchParams = { limit: 5, page: 0, query: {} },
  ) {
    const customQuery = {
      ...searchParams.query,
      market: marketId,
      isDeleted: false,
    };

    const marketProducts = await Product.find(
      customQuery,
      null,
      {
        skip: searchParams.limit * searchParams.page,
        limit: searchParams.limit,
      },
    );

    return paginate(
      marketProducts,
      {
        ...searchParams,
        query: customQuery,
      },
      Product,
    );
  };
}

module.exports = buildGetAllProducts;

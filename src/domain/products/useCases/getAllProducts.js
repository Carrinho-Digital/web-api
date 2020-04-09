const { Product } = require('../models/product');

function buildGetAllProducts(paginate) {
  return async function getAllProducts(
    user, searchParams = { limit: 5, page: 0, query: {} }) {
    if (user.isCustomer) {
      const customerQuery = {
        ...searchParams.query,
        isDeleted: false,
        inactive: false,
      };

      const customerItems = await Product.find(
        customerQuery,
        'name description sellPrice size unit promotions amoun tags',
        {
          skip: searchParams.limit * searchParams.page,
          limit: searchParams.limit,
        },
      ).populate('market', 'name phones email');

      return paginate(
        customerItems,
        {
          ...searchParams,
          query: customerQuery,
        },
        Product,
      );
    }

    const marketItems = await Product
      .findAllMarketProducts(
        user._id,
        {
          ...searchParams.query,
          isDeleted: false,
        },
        {
          skip: searchParams.limit * searchParams.page,
          limit: searchParams.limit,
        },
      );

    return paginate(
      marketItems,
      searchParams,
      Product,
    );
  };
}

module.exports = buildGetAllProducts;

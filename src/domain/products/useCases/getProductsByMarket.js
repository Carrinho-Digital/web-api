const { Product } = require('../models/product');

function buildGetProductsByMarket({
  paginate,
  findCurrentPromotionByProduct,
}) {
  async function getPromotionByProduct(product) {
    return {
      ...product.toObject(),
      promotion: await findCurrentPromotionByProduct(
        product,
        product.market._id,
      ),
    };
  }

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
      '_id name description sellPrice size unit amount tags',
      {
        skip: searchParams.limit * searchParams.page,
        limit: searchParams.limit,
      },
    ).populate('market', 'name phones email');

    const productsWithPromotions = await Promise.all(
      products.map(getPromotionByProduct),
    );

    return paginate(
      productsWithPromotions,
      {
        ...searchParams,
        query: customerQuery,
      },
      Product,
    );
  };
}

module.exports = buildGetProductsByMarket;

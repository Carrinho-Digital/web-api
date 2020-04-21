const { Product } = require('../../products/models/product');
const { Promotion } = require('../../promotions/models/promotion');

function buildGetMarketTags() {
  function getAllProductsByMarket(marketId) {
    return Product.find(
      {
        inactive: false,
        market: marketId,
        isDeleted: false,
      },
    );
  }

  function getAllPromotionsByMarket(marketId) {
    return Promotion.find(
      {
        market: marketId,
      },
    );
  }

  function destructTags(aggregator, product) {
    return aggregator.concat(...product.tags);
  }

  function sortTags(firstTag, secondTag) {
    const firstTagLower = firstTag.toLowerCase();
    const secondTagLower = secondTag.toLowerCase();

    return firstTagLower > secondTagLower;
  }

  return async function getMarketTags(marketId) {
    const products = await getAllProductsByMarket(marketId);
    const promotions = await getAllPromotionsByMarket(marketId);

    const productTags = products.reduce(destructTags, []);
    const promotionsTags = promotions.reduce(destructTags, []);

    const allTags = productTags.concat(...promotionsTags);
    return [...new Set(allTags)].sort(sortTags);
  };
}

module.exports = buildGetMarketTags;

const { Product } = require('../models/product');

function buildBelowsToMarket() {
  return async function belowsToMarket(productId, marketId) {
    const product = await Product.findOne({
      _id: productId,
      market: marketId,
    });

    return product !== null;
  };
}

module.exports = buildBelowsToMarket;

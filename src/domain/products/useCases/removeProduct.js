const { Product } = require('../models/product');

function buildRemoveProduct() {
  return async function removeProduct(productId, marketId) {
    const removedProduct = await Product.findOneAndUpdate(
      {
        _id: productId,
        market: marketId,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
        upsert: false,
        rawResult: true,
      },
    );

    return removedProduct.value;
  };
}

module.exports = buildRemoveProduct;

const { Product } = require('../models/product');
const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildInactiveOrActiveProduct() {
  return async function inactiveOrActiveProduct(marketId, productId, status) {
    const updatedProduct = await Product.findOneAndUpdate(
      {
        market: marketId,
        _id: productId,
      },
      {
        $set: {
          inactive: status,
        },
      },
      {
        new: true,
        upsert: false,
        rawResult: true,
      },
    );

    if (!updatedProduct.value) {
      throw new NotFoundException('Cannot found product');
    }

    return updatedProduct.value;
  };
}

module.exports = buildInactiveOrActiveProduct;

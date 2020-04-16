const { Product } = require('../models/product');
const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildGetProductById() {
  return async function getProductById(productId) {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      throw new NotFoundException('Cannot found product');
    }

    return product;
  };
}

module.exports = buildGetProductById;

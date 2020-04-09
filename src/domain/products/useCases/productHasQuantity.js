const { Product } = require('../models/product');
const { NotFound: NotFoundException } = require('../../../exceptions');

function buildProductHasQuantity() {
  return async function productHasQuantity(productId, quantity) {
    const normalizedQuantity = Number(quantity);
    const quantityIsNaN = isNaN(normalizedQuantity);

    if (quantityIsNaN) {
      throw new Error('Quantity is not a number');
    }

    const product = await Product.findOne({ _id: productId });

    if (!product) {
      throw new NotFoundException('Product cannot be found');
    }

    const hasQuantity = product.amount - normalizedQuantity;

    if (hasQuantity >= 0) return true;

    return false;
  };
}

module.exports = buildProductHasQuantity;

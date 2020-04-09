const { Product } = require('../models/product');

function buildUpdateProduct() {
  return async function updateProduct(
    productId, marketId, product = {}) {
    if (product.size) {
      if (!product.unit) {
        throw new Error('Unit field is required');
      }

      if (!Product.isValidUnit(product.unit)) {
        throw new Error('The unit is not valid');
      }
    }

    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: productId,
        market: marketId,
      },
      product,
      {
        new: true,
        upsert: false,
        rawResult: true,
      },
    );

    return updatedProduct.value;
  };
}

module.exports = buildUpdateProduct;

const { Product } = require('../models/product');

function buildSaveProduct() {
  return async function saveProduct(product = {}) {
    if (product.size) {
      if (!product.unit) {
        throw new Error('Unit field is required');
      }

      if (!Product.isValidUnit(product.unit)) {
        throw new Error('The unit is not valid');
      }
    }

    product.createdAt = new Date();
    const productSaved = await Product.create(product);

    return productSaved;
  };
}

module.exports = buildSaveProduct;

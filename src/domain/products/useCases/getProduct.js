const { Product } = require('../models/product');

function buildGetProduct() {
  return async function getProduct(
    productId, searchParams = { fields: null, query: {} }) {
    return await Product.findOne(
      {
        ...searchParams.query,
        _id: productId,
      },
      searchParams.fields,
    );
  };
}

module.exports = buildGetProduct;

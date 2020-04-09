const { Product } = require('../models/product');

function buildGetProductById() {
  return async function getProductById(
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

module.exports = buildGetProductById;

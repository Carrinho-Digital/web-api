const { Cart } = require('../../carts/models/cart');
const { Product } = require('../../products/models/product');

const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildGetSaleById() {
  async function populateSaleProducts(saleProducts) {
    function getProductById(productId) {
      return Product
        .findOne({ _id: productId })
        .select('_id name inactive isDeleted tags images sellPrice size unit');
    }

    const populated = saleProducts.map(async ({ _id, product, quantity }) => {
      return {
        _id,
        quantity,
        product: await getProductById(product),
      };
    });

    return Promise.all(populated);
  }

  return async function getSaleById(saleId, marketId) {
    const getSaleByIdQuery = {
      _id: saleId,
      closed: true,
      market: marketId,
    };

    const sale = await Cart
      .findOne(getSaleByIdQuery)
      .populate('user');

    if (!sale) {
      throw new NotFoundException('Cannot found sale');
    }

    const saleProducts = sale.products || [];

    if (saleProducts.length > 0) {
      const salePopulatedProducts = await populateSaleProducts(saleProducts);
      sale.products = salePopulatedProducts;
    }

    return sale;
  };
}

module.exports = buildGetSaleById;

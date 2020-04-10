const {
  getAddressById,
} = require('../../users/useCases');

const {
  marketExists,
} = require('../../market/useCases');

const {
  belowsToMarket,
  productHasQuantity,
} = require('../../products/useCases');

const buildDelivery = require('./delivery');
const buildGetCartByMarket = require('./getCurrentCartByMarket');
const buildAddProductsOnMarketCart = require('./addProductsOnMarketCart');

const getCurrentCartByMarket = buildGetCartByMarket({
  marketExists,
});
const addProductsOnMarketCart = buildAddProductsOnMarketCart({
  belowsToMarket,
  productHasQuantity,
  getCurrentCartByMarket,
});
const delivery = buildDelivery({
  getAddressById,
  getCurrentCartByMarket,
});

module.exports = {
  delivery,
  getCurrentCartByMarket,
  addProductsOnMarketCart,
};

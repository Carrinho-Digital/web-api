const {
  getAddressById,
} = require('../../users/useCases');

const {
  marketExists,
} = require('../../markets/useCases');

const {
  belowsToMarket,
  productHasQuantity,
} = require('../../products/useCases');

const buildDelivery = require('./delivery');
const buildCheckout = require('./checkout');
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
const checkout = buildCheckout({
  getCurrentCartByMarket,
});

module.exports = {
  delivery,
  checkout,
  getCurrentCartByMarket,
  addProductsOnMarketCart,
};

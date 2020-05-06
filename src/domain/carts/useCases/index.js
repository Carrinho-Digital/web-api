const {
  getAddressById,
} = require('../../users/useCases');

const {
  marketExists,
  getPaymentMethods,
  getDeliveryAvailabilities,
} = require('../../markets/useCases');

const {
  belowsToMarket,
  productHasQuantity,
} = require('../../products/useCases');

const buildDelivery = require('./delivery');
const buildCheckout = require('./checkout');
const buildAvailability = require('./availability');
const buildSavePaymentOnCart = require('./savePaymentOnCart');
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
const availability = buildAvailability({
  getCurrentCartByMarket,
  getDeliveryAvailabilities,
});
const savePaymentOnCart = buildSavePaymentOnCart({
  getPaymentMethods,
  getCurrentCartByMarket,
});

module.exports = {
  delivery,
  checkout,
  availability,
  savePaymentOnCart,
  getCurrentCartByMarket,
  addProductsOnMarketCart,
};

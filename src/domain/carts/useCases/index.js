const {
  getUserById,
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
const buildDeliveryPrice = require('./deliveryPrice');
const buildDeliveryDistance = require('./deliveryDistance');
const buildSavePaymentOnCart = require('./savePaymentOnCart');
const buildGetCartByMarket = require('./getCurrentCartByMarket');
const buildAddProductsOnMarketCart = require('./addProductsOnMarketCart');

const deliveryDistance = buildDeliveryDistance({
  getUserById,
  getAddressById,
});

const deliveryPrice = buildDeliveryPrice({
  getUserById,
});

const getCurrentCartByMarket = buildGetCartByMarket({
  marketExists,
  deliveryPrice,
  deliveryDistance,
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

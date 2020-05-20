const { paginate } = require('../../../utils/paginate');

const {
  getUserById,
  getAddressById,
} = require('../../users/useCases');

const {
  marketExists,
  getPaymentMethods,
  findMarketAvailability,
  marketHasProductsInTheCart,
} = require('../../markets/useCases');

const {
  getProductById,
  productHasQuantity,
} = require('../../products/useCases');

const buildDelivery = require('./delivery');
const buildCheckout = require('./checkout');
const buildCartsHistory = require('./cartsHistory');
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
  getUserById,
  marketExists,
  deliveryPrice,
  deliveryDistance,
});
const addProductsOnMarketCart = buildAddProductsOnMarketCart({
  getCurrentCartByMarket,
  marketHasProductsInTheCart,
});
const delivery = buildDelivery({
  getAddressById,
  getCurrentCartByMarket,
});
const availability = buildAvailability({
  getCurrentCartByMarket,
  findMarketAvailability,
});
const checkout = buildCheckout({
  getProductById,
  productHasQuantity,
  getCurrentCartByMarket,
  findMarketAvailability,
});
const savePaymentOnCart = buildSavePaymentOnCart({
  getPaymentMethods,
  getCurrentCartByMarket,
});
const cartsHitory = buildCartsHistory({
  paginate,
});

module.exports = {
  delivery,
  checkout,
  cartsHitory,
  availability,
  savePaymentOnCart,
  getCurrentCartByMarket,
  addProductsOnMarketCart,
};

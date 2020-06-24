const events = require('../../../events');

const {
  paginate,
  getRefSearch,
  simplePaginate,
} = require('../../../utils/paginate');

const {
  findCurrentPromotionByProduct,
} = require('../../promotions/useCases');

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
const buildGetSales = require('./getSales');
const buildGetSalesById = require('./getSaleById');
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
  events,
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
const getSales = buildGetSales({
  getRefSearch,
  simplePaginate,
});
const getSalesById = buildGetSalesById({
  getAddressById,
  deliveryDistance,
  deliveryPrice,
  findCurrentPromotionByProduct,
});


module.exports = {
  delivery,
  checkout,
  cartsHitory,
  availability,
  getSales,
  getSalesById,
  savePaymentOnCart,
  getCurrentCartByMarket,
  addProductsOnMarketCart,
  deliveryDistance,
  deliveryPrice,
};

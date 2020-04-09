const {
  marketExists,
} = require('../../market/useCases');

const {
  belowsToMarket,
  productHasQuantity,
} = require('../../products/useCases');

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

module.exports = {
  getCurrentCartByMarket,
  addProductsOnMarketCart,
};

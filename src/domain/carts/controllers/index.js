const router = require('express').Router();
const { authentication, only } = require('../../../middleware');

const delivery = require('./delivery');
const checkout = require('./checkout');
const payments = require('./payments');
const getCurrentCartByMarket = require('./getCurrentCartByMarket');
const addProductsOnMarketCart = require('./addProductsOnMarketCart');

router.patch(
  '/delivery/:marketId',
  authentication,
  only('CUSTOMER_USER'),
  delivery,
);

router.patch(
  '/payments/:marketId',
  authentication,
  only('CUSTOMER_USER'),
  payments,
);

router.post(
  '/add/:marketId',
  authentication,
  only('CUSTOMER_USER'),
  addProductsOnMarketCart,
);

router.post(
  '/checkout/:marketId',
  authentication,
  only('CUSTOMER_USER'),
  checkout,
);

router.get(
  '/:marketId',
  authentication,
  only('CUSTOMER_USER'),
  getCurrentCartByMarket,
);

module.exports = router;

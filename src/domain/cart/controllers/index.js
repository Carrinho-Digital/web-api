const router = require('express').Router();
const { authentication, only } = require('../../../middleware');

const getCurrentCartByMarket = require('./getCurrentCartByMarket');
const addProductsOnMarketCart = require('./addProductsOnMarketCart');

router.post(
  '/add/:marketId',
  authentication,
  only('CUSTOMER_USER'),
  addProductsOnMarketCart,
);

router.get(
  '/:marketId',
  authentication,
  only('CUSTOMER_USER'),
  getCurrentCartByMarket,
);


module.exports = router;

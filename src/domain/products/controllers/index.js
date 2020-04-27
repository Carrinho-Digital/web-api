const router = require('express').Router();
const { authentication, only } = require('../../../middleware');

const getProducts = require('./getProducts');
const getProduct = require('./getProductById');
const getProductsByMarket = require('./getProductsByMarket');
const saveProduct = require('./saveProduct');
const updateProduct = require('./updateProduct');
const inactiveOrActiveProduct = require('./inactiveOrActiveProduct');
const removeProduct = require('./removeProduct');

router.get(
  '/',
  authentication,
  only('MARKET_USER'),
  getProducts,
);

router.get('/:productId', authentication, getProduct);

router.get(
  '/market/:marketId',
  authentication,
  only('CUSTOMER_USER'),
  getProductsByMarket,
);

router.post('/', authentication, saveProduct);

router.put('/:productId', authentication, updateProduct);

router.patch(
  '/inactive/:productId',
  authentication,
  only('MARKET_USER'),
  inactiveOrActiveProduct);

router.delete('/:productId', authentication, removeProduct);

module.exports = router;

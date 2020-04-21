const router = require('express').Router();
const {
  authentication,
  only,
} = require('../../../middleware');

const getAllMarkets = require('./getAllMarkets');
const favoriteMarket = require('./favoriteMarket');
const addDeliveryRule = require('./addDeliveryRule');
const getDeliveryRules = require('./getDeliveryRules');
const updateDeliveryRule = require('./updateDeliveryRule');
const deleteDeliveryRule = require('./deleteDeliveryRule');
const addPaymentMethod = require('./addPaymentMethod');
const deletePaymentMethod = require('./deletePaymentMethod');
const updatePaymentMethod = require('./updatePaymentMethod');
const getPaymentMethods = require('./getPaymentMethods');
const getCurrentMarketTags = require('./getCurrentMarketTags');

const categories = require('./categories');

router.get('/',
  authentication,
  only('CUSTOMER_USER'),
  getAllMarkets,
);

router.get(
  '/rules',
  authentication,
  only('MARKET_USER'),
  getDeliveryRules,
);

router.get(
  '/payments',
  authentication,
  only('MARKET_USER'),
  getPaymentMethods,
);

router.get(
  '/tags',
  authentication,
  only('MARKET_USER'),
  getCurrentMarketTags,
);

router.get(
  '/tags/:marketId',
  authentication,
  only('CUSTOMER_USER'),
  getCurrentMarketTags,
);

router.post(
  '/rules',
  authentication,
  only('MARKET_USER'),
  addDeliveryRule,
);

router.post(
  '/payments',
  authentication,
  only('MARKET_USER'),
  addPaymentMethod,
);

router.patch(
  '/favorite',
  authentication,
  only('CUSTOMER_USER'),
  favoriteMarket,
);

router.put(
  '/rules/:ruleId',
  authentication,
  only('MARKET_USER'),
  updateDeliveryRule,
);

router.put(
  '/payments/:paymentId',
  authentication,
  only('MARKET_USER'),
  updatePaymentMethod,
);

router.delete(
  '/rules/:ruleId',
  authentication,
  only('MARKET_USER'),
  deleteDeliveryRule,
);

router.delete(
  '/payments/:paymentId',
  authentication,
  only('MARKET_USER'),
  deletePaymentMethod,
);

router.get('/categories', authentication, categories);

module.exports = router;

const router = require('express').Router();
const {
  authentication,
  only,
} = require('../../../middleware');

const getAllMarkets = require('./getAllMarkets');
const favoriteMarket = require('./favoriteMarket');
const addDeliveryRule = require('./addDeliveryRule');
const getDeliveryRules = require('./getDeliveryRules');
const addPaymentMethod = require('./addPaymentMethod');
const updateDeliveryRule = require('./updateDeliveryRule');
const deleteDeliveryRule = require('./deleteDeliveryRule');
const getDeliveryRuleById = require('./getDeliveryRuleById');
const deletePaymentMethod = require('./deletePaymentMethod');
const updatePaymentMethod = require('./updatePaymentMethod');
const getPaymentMethods = require('./getPaymentMethods');
const getCurrentMarketTags = require('./getCurrentMarketTags');
const getDeliveryAvailabilities = require('./getDeliveryAvailabilities');
const getDeliveryAvailabilityById = require('./getDeliveryAvailabilityById');
const upsertAvailability = require('./upsertDeliveryAvailability');
const deleteDeliveryAvailability = require('./deleteDeliveryAvailability');

const categories = require('./categories');

router.get(
  '/rules/:marketId?',
  authentication,
  getDeliveryRules,
);

router.get(
  '/rules/get/:ruleId',
  authentication,
  only('MARKET_USER'),
  getDeliveryRuleById,
);

router.get(
  '/availabilities/get/:availabilityId',
  authentication,
  only('MARKET_USER'),
  getDeliveryAvailabilityById,
);

router.get(
  '/availabilities/:marketId?',
  authentication,
  getDeliveryAvailabilities,
);

router.get(
  '/payments',
  authentication,
  only('MARKET_USER'),
  getPaymentMethods,
);

router.get(
  '/payments/:marketId',
  authentication,
  only('CUSTOMER_USER'),
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

router.get('/:customerAddressId',
  authentication,
  only('CUSTOMER_USER'),
  getAllMarkets,
);

router.post(
  '/rules',
  authentication,
  only('MARKET_USER'),
  addDeliveryRule,
);

router.post(
  '/availabilities',
  authentication,
  only('MARKET_USER'),
  upsertAvailability,
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
  '/availabilities/:availabilityId',
  authentication,
  only('MARKET_USER'),
  upsertAvailability,
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
  '/availability/:availabilityId',
  authentication,
  only('MARKET_USER'),
  deleteDeliveryAvailability,
);

router.delete(
  '/payments/:paymentId',
  authentication,
  only('MARKET_USER'),
  deletePaymentMethod,
);

router.get('/categories', authentication, categories);

module.exports = router;

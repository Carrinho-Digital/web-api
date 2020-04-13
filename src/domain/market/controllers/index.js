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

router.get('/',
  authentication,
  only('CUSTOMER_USER'),
  getAllMarkets,
);

router.patch(
  '/favorite',
  authentication,
  only('CUSTOMER_USER'),
  favoriteMarket,
);

router.get(
  '/rules',
  authentication,
  only('MARKET_USER'),
  getDeliveryRules,
);

router.post(
  '/rules',
  authentication,
  only('MARKET_USER'),
  addDeliveryRule,
);

router.put(
  '/rules/:ruleId',
  authentication,
  only('MARKET_USER'),
  updateDeliveryRule,
);

router.delete(
  '/rules/:ruleId',
  authentication,
  only('MARKET_USER'),
  deleteDeliveryRule,
);


module.exports = router;

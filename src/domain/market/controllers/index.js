const router = require('express').Router();
const {
  authentication,
  only,
} = require('../../../middleware');

const getAllMarkets = require('./getAllMarkets');
const favoriteMarket = require('./favoriteMarket');

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

module.exports = router;

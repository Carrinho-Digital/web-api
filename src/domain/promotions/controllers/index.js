const router = require('express').Router();
const {
  only,
  authentication,
} = require('../../../middleware');

const addPromotion = require('./addPromotion');

router.post(
  '/',
  authentication,
  only('MARKET_USER'),
  addPromotion,
);

module.exports = router;

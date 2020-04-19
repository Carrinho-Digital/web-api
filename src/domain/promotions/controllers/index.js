const router = require('express').Router();
const {
  only,
  authentication,
} = require('../../../middleware');

const getPromotions = require('./getPromotions');
const removePromotion = require('./removePromotion');
const getPromotionById = require('./getPromotionById');
const addOrUpdatePromotion = require('./addOrUpdatePromotion');

router.get(
  '/',
  authentication,
  only('MARKET_USER'),
  getPromotions,
);

router.get(
  '/:promotionId',
  authentication,
  only('MARKET_USER'),
  getPromotionById,
);

router.post(
  '/',
  authentication,
  only('MARKET_USER'),
  addOrUpdatePromotion,
);

router.put(
  '/:promotionId',
  authentication,
  only('MARKET_USER'),
  addOrUpdatePromotion,
);

router.delete(
  '/:promotionId',
  authentication,
  only('MARKET_USER'),
  removePromotion,
);

module.exports = router;

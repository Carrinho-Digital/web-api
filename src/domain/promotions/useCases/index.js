const { paginate } = require('../../../utils/paginate');

const {
  getProductById,
} = require('../../products/useCases');

const buildGetPromotion = require('./getPromotions');
const buildRemovePromotion = require('./removePromotion');
const buildUpsertPromotion = require('./upsertPromotion');
const buildGetPromotionById = require('./getPromotionById');

const getPromotionById = buildGetPromotionById();

const getPromotion = buildGetPromotion({
  paginate,
});

const upsertPromotion = buildUpsertPromotion({
  getProductById,
});

const removePromotion = buildRemovePromotion();

module.exports = {
  upsertPromotion,
  getPromotionById,
  getPromotion,
  removePromotion,
};

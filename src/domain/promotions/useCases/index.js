const { paginate } = require('../../../utils/paginate');
const {
  getProductById,
} = require('../../products/useCases');

const buildGetPromotion = require('./getPromotions');
const buildRemovePromotion = require('./removePromotion');
const buildUpsertPromotion = require('./upsertPromotion');
const buildGetPromotionById = require('./getPromotionById');
// eslint-disable-next-line max-len
const buildFindCurrentPromotionByProduct = require('./findCurrentPromotionByProduct');

const getPromotionById = buildGetPromotionById();

const getPromotion = buildGetPromotion({
  paginate,
});

const upsertPromotion = buildUpsertPromotion(getProductById);

const removePromotion = buildRemovePromotion();
const findCurrentPromotionByProduct = buildFindCurrentPromotionByProduct();


module.exports = {
  getPromotion,
  upsertPromotion,
  removePromotion,
  getPromotionById,
  findCurrentPromotionByProduct,
};

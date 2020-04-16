const {
  getProductById,
} = require('../../products/useCases');

const buildUpsertPromotion = require('./upsertPromotion');

const upsertPromotion = buildUpsertPromotion({
  getProductById,
});

module.exports = {
  upsertPromotion,
};

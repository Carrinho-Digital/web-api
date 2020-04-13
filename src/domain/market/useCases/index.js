const { paginate } = require('../../../utils/paginate');

const buildMarketExists = require('./marketExists');
const buildFavoriteMarket = require('./favoriteMarket');
const buildGetAllMarkets = require('./getAllMarkets');
const buildFreeDeliveryRule = require('./freeDeliveryRule');
const buildUpsertDeliveryRule = require('./upsertDeliveryRule');
const buildGetDeliveryRules = require('./getDeliveryRules');
const buildDeleteDeliveryRule = require('./deleteDeliveryRule');

const getAllMarkets = buildGetAllMarkets(paginate);
const marketExists = buildMarketExists();
const favoriteMarket = buildFavoriteMarket({ marketExists });
const freeDeliveryRule = buildFreeDeliveryRule();
const upsertDeliveryRule = buildUpsertDeliveryRule();
const getDeliveryRules = buildGetDeliveryRules();
const deleteDeliveryRule = buildDeleteDeliveryRule();

module.exports = {
  marketExists,
  favoriteMarket,
  getAllMarkets,
  freeDeliveryRule,
  upsertDeliveryRule,
  deleteDeliveryRule,
  getDeliveryRules,
};

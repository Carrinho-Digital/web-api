const { paginate } = require('../../../utils/paginate');

const {
  getUserById,
} = require('../../users/useCases');

const buildCategories = require('./categories');

const buildMarketExists = require('./marketExists');
const buildFavoriteMarket = require('./favoriteMarket');
const buildGetAllMarkets = require('./getAllMarkets');
const buildFreeDeliveryRule = require('./freeDeliveryRule');
const buildUpsertDeliveryRule = require('./upsertDeliveryRule');
const buildGetDeliveryRules = require('./getDeliveryRules');
const buildDeleteDeliveryRule = require('./deleteDeliveryRule');
const buildGetMarketTags = require('./getMarketTags');

const buildUpsertPaymentMethod = require('./upsertPaymentMethod');
const buildGetPaymentMethods = require('./getPaymentMethods');
const buildDeletePaymentMethod = require('./deletePaymentMethod');

const buildUpsertDeliveryAvailability =
  require('./upsertDeliveryAvailability');
const buildGetDeliveryAvailabilities =
  require('./getDeliveryAvailabilities');
const buildDeleteDeliveryAvalability =
  require('./deleteDeliveryAvailability');

const categories = buildCategories();
const getAllMarkets = buildGetAllMarkets(paginate);
const marketExists = buildMarketExists();
const favoriteMarket = buildFavoriteMarket({ marketExists });
const freeDeliveryRule = buildFreeDeliveryRule();
const upsertDeliveryRule = buildUpsertDeliveryRule();
const getDeliveryRules = buildGetDeliveryRules();
const deleteDeliveryRule = buildDeleteDeliveryRule();
const getMarketTags = buildGetMarketTags();

const deleteDeliveryAvalability = buildDeleteDeliveryAvalability({
  getUserById,
});
const upsertDeliveryAvailability = buildUpsertDeliveryAvailability({
  getUserById,
});
const getDeliveryAvailabilities = buildGetDeliveryAvailabilities({
  getUserById,
});

const getPaymentMethods = buildGetPaymentMethods({
  getUserById,
});
const upsertPaymentMethod = buildUpsertPaymentMethod({
  getUserById,
});
const deletePaymentMethod = buildDeletePaymentMethod({
  getUserById,
});

module.exports = {
  marketExists,
  favoriteMarket,
  getAllMarkets,
  freeDeliveryRule,
  upsertDeliveryRule,
  deleteDeliveryRule,
  getDeliveryRules,
  upsertPaymentMethod,
  getPaymentMethods,
  deletePaymentMethod,
  categories,
  getMarketTags,
  upsertDeliveryAvailability,
  getDeliveryAvailabilities,
  deleteDeliveryAvalability,
};

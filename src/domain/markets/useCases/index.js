const {
  paginate,
  simplePaginate,
  getRefSearch,
} = require('../../../utils/paginate');

const {
  getUserById,
} = require('../../users/useCases');


const {
  belowsToMarket,
  productHasQuantity,
} = require('../../products/useCases');

const buildCategories = require('./categories');

const buildMarketExists = require('./marketExists');
const buildFavoriteMarket = require('./favoriteMarket');
const buildGetAllMarkets = require('./getAllMarkets');
const buildFreeDeliveryRule = require('./freeDeliveryRule');
const buildUpsertDeliveryRule = require('./upsertDeliveryRule');
const buildGetDeliveryRules = require('./getDeliveryRules');
const buildGetDeliveryRuleById = require('./getDeliveryRuleById');
const buildDeleteDeliveryRule = require('./deleteDeliveryRule');
const buildGetMarketTags = require('./getMarketTags');
const buildFindMarketAvailability = require('./findMarketAvailability');
const buildMarketHasProductsInTheCart = require('./marketHasProductsInTheCart');

const buildUpsertPaymentMethod = require('./upsertPaymentMethod');
const buildGetPaymentMethods = require('./getPaymentMethods');
const buildDeletePaymentMethod = require('./deletePaymentMethod');

const buildUpsertDeliveryAvailability =
  require('./upsertDeliveryAvailability');
const buildGetDeliveryAvailabilities =
  require('./getDeliveryAvailabilities');
const buildGetDeliveryAvailabilityById =
  require('./getDeliveryAvailabilityById');
const buildDeleteDeliveryAvalability =
  require('./deleteDeliveryAvailability');
const buildGetSales = require('./getSales');

const getSales = buildGetSales({
  simplePaginate,
  getRefSearch,
});
const categories = buildCategories();
const getAllMarkets = buildGetAllMarkets(paginate);
const marketExists = buildMarketExists();
const favoriteMarket = buildFavoriteMarket({ marketExists });
const freeDeliveryRule = buildFreeDeliveryRule();
const upsertDeliveryRule = buildUpsertDeliveryRule();

const getDeliveryRules = buildGetDeliveryRules();
const getDeliveryRuleById = buildGetDeliveryRuleById({
  getUserById,
});

const deleteDeliveryRule = buildDeleteDeliveryRule();
const getMarketTags = buildGetMarketTags();

const marketHasProductsInTheCart = buildMarketHasProductsInTheCart({
  belowsToMarket,
  productHasQuantity,
});
const deleteDeliveryAvalability = buildDeleteDeliveryAvalability({
  getUserById,
});
const upsertDeliveryAvailability = buildUpsertDeliveryAvailability({
  getUserById,
});
const getDeliveryAvailabilities = buildGetDeliveryAvailabilities({
  getUserById,
});
const getDeliveryAvailabilityById = buildGetDeliveryAvailabilityById({
  getDeliveryAvailabilities,
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
const findMarketAvailability = buildFindMarketAvailability({
  getDeliveryAvailabilities,
});

module.exports = {
  marketExists,
  favoriteMarket,
  getAllMarkets,
  freeDeliveryRule,
  upsertDeliveryRule,
  deleteDeliveryRule,
  getDeliveryRules,
  getDeliveryRuleById,
  upsertPaymentMethod,
  getPaymentMethods,
  deletePaymentMethod,
  categories,
  getMarketTags,
  findMarketAvailability,
  upsertDeliveryAvailability,
  getDeliveryAvailabilities,
  deleteDeliveryAvalability,
  getDeliveryAvailabilityById,
  marketHasProductsInTheCart,
  getSales,
};

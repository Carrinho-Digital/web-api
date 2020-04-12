const { paginate } = require('../../../utils/paginate');

const buildMarketExists = require('./marketExists');
const buildFavoriteMarket = require('./favoriteMarket');
const buildGetAllMarkets = require('./getAllMarkets');

const getAllMarkets = buildGetAllMarkets(paginate);
const marketExists = buildMarketExists();
const favoriteMarket = buildFavoriteMarket({ marketExists });

module.exports = {
  marketExists,
  favoriteMarket,
  getAllMarkets,
};

const buildMarketExists = require('./marketExists');
const buildFavoriteMarket = require('./favoriteMarket');

const marketExists = buildMarketExists();
const favoriteMarket = buildFavoriteMarket({ marketExists });

module.exports = {
  marketExists,
  favoriteMarket,
};

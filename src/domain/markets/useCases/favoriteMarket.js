const User = require('../../users/models/user');
const {
  NotFound,
} = require('../../../exceptions');

function buildFavoriteMarket({
  marketExists,
}) {
  return async function favoriteMarket(marketId, userId, isFavorite) {
    const user = await User.findOne({ _id: userId });
    const userFavoriteMarkets = [...user.favorites];

    if (isFavorite === false) {
      user.favorites = userFavoriteMarkets
        .filter(favoriteMarket => favoriteMarket !== marketId);

      return user.save();
    }

    let marketUserExists = false;

    try {
      marketUserExists = await marketExists(marketId);
    } catch (exception) {
      throw new NotFound('Market could not be found');
    }

    if (!marketUserExists) {
      throw new NotFound('Market could not be found');
    }

    user.favorites = userFavoriteMarkets.concat(marketId);

    return user.save();
  };
}

module.exports = buildFavoriteMarket;

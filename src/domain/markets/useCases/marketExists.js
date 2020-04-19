const User = require('../../users/models/user');

function buildMarketExists() {
  return async function marketExists(marketId) {
    const user = await User.findById(marketId);

    if (!user) return false;

    if (user.type === 'MARKET_USER') return true;

    return false;
  };
}

module.exports = buildMarketExists;

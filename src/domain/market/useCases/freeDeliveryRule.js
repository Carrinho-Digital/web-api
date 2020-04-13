const User = require('../../users/models/user');

function buildFreeDeliveryRule() {
  return async function freeDeliveryRule(marketId, freeDelivery) {
    await User.findOneAndUpdate(
      {
        _id: marketId,
      },
      {
        freeDelivery,
      },
    );
  };
}

module.exports = buildFreeDeliveryRule;

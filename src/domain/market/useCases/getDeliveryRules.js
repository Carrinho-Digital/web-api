const User = require('../../users/models/user');

function buildGetDeliveryRules() {
  return async function getDeliveryRules(marketId) {
    const marketUser = await User.findOne({ _id: marketId });
    return marketUser.deliveryRules;
  };
}

module.exports = buildGetDeliveryRules;

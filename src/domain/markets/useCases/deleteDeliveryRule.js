const User = require('../../users/models/user');
const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildDeleteDeliveryRule() {
  return async function deleteDeliveryRule(ruleId, marketId) {
    const marketUser = await User.findOne({ _id: marketId });

    if (!marketUser) {
      throw new NotFoundException('Market could not be found');
    }

    const rule = marketUser.deliveryRules.id(ruleId);

    if (!rule) {
      throw new NotFoundException('Delivery rule could not be found');
    }

    rule.remove();

    await marketUser.save();
  };
}

module.exports = buildDeleteDeliveryRule;

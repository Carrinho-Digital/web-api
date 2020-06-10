const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildGetDeliveryRuleById({
  getUserById,
}) {
  return async function getDeliveryRuleById(marketId, deliveryRuleId) {
    const marketUser = await getUserById(marketId);

    const deliveryRules = marketUser.deliveryRules;

    const deliveryRule = deliveryRules.find(
      ({ _id }) => deliveryRuleId === _id.toString());

    if (!deliveryRule) {
      throw new NotFoundException('Cannot find delivery rule');
    }

    return deliveryRule;
  };
}

module.exports = buildGetDeliveryRuleById;

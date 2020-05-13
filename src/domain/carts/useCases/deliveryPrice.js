const {
  MarketHasNotDeliveryRules: MarketHasNotDeliveryRulesException,
} = require('../../../exceptions');

function buildDeliveryPrice({
  getUserById,
}) {
  return async function deliveryPrice(distance, marketId) {
    const market = await getUserById(marketId);

    if (market.freeDelivery) return 0;


    const marketDeliveryRules = market.deliveryRules || [];
    const marketHasDeliveryRules = marketDeliveryRules.length > 0;

    if (!marketHasDeliveryRules) {
      throw new MarketHasNotDeliveryRulesException();
    }

    const deliveryRulesToDistance = marketDeliveryRules
      .filter(deliveryRule => deliveryRule.distanceInKm >= distance);

    const hasDeliveryRulesToDistance = deliveryRulesToDistance.length > 0;

    if (!hasDeliveryRulesToDistance) {
      const defaultDeliveryRule = marketDeliveryRules
        .find(deliveryRule => deliveryRule.defaultRule);

      if (!defaultDeliveryRule) {
        return 0;
      }

      return defaultDeliveryRule.price;
    }

    return deliveryRulesToDistance[0].price;
  };
}

module.exports = buildDeliveryPrice;

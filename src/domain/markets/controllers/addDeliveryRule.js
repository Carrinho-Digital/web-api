const {
  freeDeliveryRule,
  upsertDeliveryRule,
} = require('../useCases');

async function deliveryRules(request, response) {
  const marketId = request.user._id;

  const price = request.body.price;
  const freeDelivery = request.body.freeDelivery;
  const distanceInKm = request.body.distanceInKm;
  const defaultRule = request.body.defaultRule || false;

  if (typeof freeDelivery === 'boolean') {
    try {
      await freeDeliveryRule(marketId, freeDelivery);
      return response.status(200).json({
        success: true,
        message: 'FREE_DELIVERY_RULE',
      });
    } catch (exception) {
      return response.status(exception.status || 500).json({
        success: false,
        message: 'CANNOT_CREATE_FREE_DELIVERY_RULE',
        errors: [
          exception.message,
        ],
      });
    }
  }

  if (typeof defaultRule !== 'boolean') {
    return response.status(400).json({
      success: false,
      message: 'DELIVERY_RULE_BAD_REQUEST',
      errors: [
        'defaultRule must be boolean',
      ],
    });
  }

  if (defaultRule === false && (!distanceInKm || distanceInKm < 1)) {
    return response.status(400).json({
      success: false,
      message: 'DELIVERY_RULE_BAD_REQUEST',
      errors: [
        'distanceInKm must be greater then 0',
      ],
    });
  }

  try {
    await upsertDeliveryRule(null, marketId, distanceInKm, price, defaultRule);

    return response.status(200).json({
      success: true,
      message: 'CREATED_DELIVERY_RULE',
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      message: 'CANNOT_CREATE_FREE_DELIVERY_RULE',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = deliveryRules;

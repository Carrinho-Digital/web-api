const {
  upsertDeliveryRule,
} = require('../useCases');

async function updateDeliveryRule(request, response) {
  const ruleId = request.params.ruleId;
  const marketId = request.user._id;

  const price = request.body.price;
  const distanceInKm = request.body.distanceInKm;
  const defaultRule = request.body.defaultRule;

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
    await upsertDeliveryRule(
      ruleId,
      marketId,
      distanceInKm,
      price,
      defaultRule,
    );

    return response.status(200).json({
      success: true,
      message: 'UPDATED_DELIVERY_RULE',
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      message: 'CANNOT_UPDATED_FREE_DELIVERY_RULE',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = updateDeliveryRule;

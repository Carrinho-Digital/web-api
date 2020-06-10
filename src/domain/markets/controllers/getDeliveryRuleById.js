const {
  getDeliveryRuleById: getDeliveryRuleByIdUseCase,
} = require('../useCases');

async function getDeliveryRuleById(request, response) {
  const marketId = request.user._id;
  const deliveryRuleId = request.params.ruleId;

  try {
    const deliveryRule = await getDeliveryRuleByIdUseCase(
      marketId, deliveryRuleId);

    return response.status(200).json({
      success: true,
      data: deliveryRule,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      message: 'CANNOT_GET_DELIVERY_RULE_BY_ID',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = getDeliveryRuleById;

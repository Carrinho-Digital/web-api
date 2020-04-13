const {
  deleteDeliveryRule: deleteDeliveryRuleUseCase,
} = require('../useCases');

async function deleteDeliveryRule(request, response) {
  const marketId = request.user._id;
  const ruleId = request.params.ruleId;

  try {
    await deleteDeliveryRuleUseCase(ruleId, marketId);
    return response.status(200).json({
      success: true,
      message: 'DELIVERY_RULE_DELETED',
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      errors: [
        exception.message,
      ],
      message: 'CANNOT_DELETE_DELIVERY_RULE',
    });
  }
}

module.exports = deleteDeliveryRule;

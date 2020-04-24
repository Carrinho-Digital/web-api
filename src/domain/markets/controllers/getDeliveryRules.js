const {
  getDeliveryRules: getDeliveryRulesUseCase,
} = require('../useCases');

async function getDeliveryRules(request, response) {
  const marketId = request.user._id;

  try {
    const deliveryRules = await getDeliveryRulesUseCase(marketId);

    return response.status(200).json({
      success: true,
      data: deliveryRules,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      message: 'CANNOT_GET_ALL_DELIVERY_RULES',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = getDeliveryRules;

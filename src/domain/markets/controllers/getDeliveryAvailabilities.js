const {
  getDeliveryAvailabilities: getDeliveryAvailabilitiesUseCase,
} = require('../useCases');

async function getDeliveryAvailabilities(request, response) {
  const marketId =
    request.user.isMarket ? request.user._id : request.params.marketId;

  if (!marketId) {
    return response.status(400).json({
      success: false,
      errors: [
        'Market id parameter is required',
      ],
      message: 'CANNOT_GET_DELIVERY_AVAILABILITIES',
    });
  }

  try {
    const marketAvailabilities = await getDeliveryAvailabilitiesUseCase(
      marketId,
    );

    return response.status(200).json(marketAvailabilities);
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      message: 'CANNOT_GET_DELIVERY_AVAILABILITIES',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = getDeliveryAvailabilities;

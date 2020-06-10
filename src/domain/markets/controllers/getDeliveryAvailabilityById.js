const {
  getDeliveryAvailabilityById: getDeliveryAvailabilityByIdUseCase,
} = require('../useCases');

async function getDeliveryAvailabilityById(request, response) {
  const marketId = request.user._id;
  const availabilityId = request.params.availabilityId;


  try {
    const availability = await getDeliveryAvailabilityByIdUseCase(
      marketId, availabilityId);

    return response.status(200).json({
      success: true,
      data: availability,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      message: 'CANNOT_GET_DELIVERY_AVAILABILITY_BY_ID',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = getDeliveryAvailabilityById;

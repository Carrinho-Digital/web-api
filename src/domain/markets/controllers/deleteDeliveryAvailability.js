const {
  deleteDeliveryAvalability: deleteDeliveryAvailabilityUseCase,
} = require('../useCases');

async function deleteDeliveryAvailability(request, response) {
  const marketId = request.user._id;
  const availabilityId = request.params.availabilityId;

  try {
    await deleteDeliveryAvailabilityUseCase(availabilityId, marketId);
    return response.status(200).json({
      success: true,
      message: 'DELIVERY_AVAILABILITY_DELETED',
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      errors: [
        exception.message,
      ],
      message: 'CANNOT_DELETE_DELIVERY_AVAILABILITY',
    });
  }
}

module.exports = deleteDeliveryAvailability;

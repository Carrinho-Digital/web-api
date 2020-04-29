const { upsertDeliveryAvailability } = require('../useCases');

async function upsertAvailability(request, response) {
  const marketId = request.user._id;
  const availabilityBody = request.body;
  const avalabilityId = request.params.availabilityId;

  const { dayOfWeek, availabilities } = availabilityBody;

  if (!dayOfWeek || !availabilities) {
    return response.status(400).json({
      success: false,
      message: 'CANNOT_ADD_DELIVERY_AVAILABILITY',
      errors: [
        'dayOfWeek is required',
        'availabilities is required',
      ],
    });
  }

  try {
    await upsertDeliveryAvailability(
      avalabilityId,
      marketId,
      availabilityBody.dayOfWeek,
      availabilityBody.availabilities,
    );

    return response.status(201).json({
      success: true,
      message: 'DELIVERY_AVAILABILITY_SAVED',
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      errors: [
        exception.message,
      ],
      message: 'CANNOT_ADD_DELIVERY_AVAILABILITY',
    });
  }
}

module.exports = upsertAvailability;

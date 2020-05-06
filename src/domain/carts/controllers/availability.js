const {
  availability: availabilityUseCase,
} = require('../useCases');

async function deliveryAvailbaility(request, response) {
  const userId = request.user._id;
  const marketId = request.params.marketId;
  const { availability, availabilityTime } = request.body;

  if (!availability || !availabilityTime) {
    return response.status(400).json({
      success: false,
      errors: [
        'Market availability and availability time are required',
      ],
      message: 'CANNOT_SAVE_AVAILABILITY_ON_CART',
    });
  }

  try {
    const updatedCart = await availabilityUseCase(
      marketId,
      userId,
      {
        availability,
        availabilityTime,
      },
    );

    return response.status(200).json({
      success: true,
      message: 'DELIVERY_AVAILABILITY_SAVED',
      data: updatedCart,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      errors: [
        exception.message,
      ],
      message: 'CANNOT_SAVE_AVAILABILITY_ON_CART',
    });
  }
}

module.exports = deliveryAvailbaility;

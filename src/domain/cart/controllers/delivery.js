const {
  delivery: deliveryUseCase,
} = require('../useCases');

function isDeliveryMethodValid(deliveryMethod) {
  const deliveryMethods = ['pickup', 'delivery'];
  return deliveryMethods.includes(deliveryMethod);
}

async function delivery(request, response) {
  const userId = request.user._id;
  const marketId = request.params.marketId;

  const deliveryMethod = request.body.method;
  const deliveryAddress = request.body.address;

  if (!isDeliveryMethodValid(deliveryMethod)) {
    return response.status(400).json({
      success: false,
      message: 'INVALID_DELIVERY_METHOD',
      errors: [
        'Choose between pickup and delivery as method',
      ],
    });
  }

  if (!deliveryAddress) {
    return response.status(400).json({
      success: false,
      message: 'ADDRESS_INVALID',
      errors: [
        'Address is a required field',
      ],
    });
  }

  try {
    await deliveryUseCase(
      deliveryMethod,
      deliveryAddress,
      marketId,
      userId,
    );

    return response.status(200).json({
      success: true,
      message: 'ADDRESS_TO_DELIVERY_DEFINED',
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      message: 'CANNOT_DEFINE_DELIVERY_ADDRESS',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = delivery;

const {
  getPaymentMethods: getPaymentMethodsUseCase,
} = require('../useCases');

async function getPaymentMethods(request, response) {
  const marketId = request.user._id;

  try {
    const paymentMethods = await getPaymentMethodsUseCase(marketId);

    return response.status(200).json({
      success: true,
      data: paymentMethods,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      message: 'CANNOT_GET_PAYMENT_METHODS',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = getPaymentMethods;

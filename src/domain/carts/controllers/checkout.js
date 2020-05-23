const {
  checkout: checkoutUseCase,
} = require('../useCases');

async function checkout(request, response) {
  const userId = request.user._id;
  const marketId = request.params.marketId;

  try {
    const checkoutedCart = await checkoutUseCase(marketId, userId);

    return response.status(200).json({
      success: true,
      message: 'CHECKOUT_PERFORMED',
      data: checkoutedCart,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      message: 'UNABLE_TO_CHECKOUT',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = checkout;

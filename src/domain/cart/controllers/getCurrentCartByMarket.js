const {
  getCurrentCartByMarket: getCurrentCartByMarketUseCase,
} = require('../useCases');

async function getCurrentCartByMarket(request, response) {
  const userId = request.user._id;
  const marketId = request.params.marketId;

  try {
    const cart = await getCurrentCartByMarketUseCase(marketId, userId);
    return response.status(200).json(cart);
  } catch (exception) {
    return response.status(exception.status || 500).json({
      message: 'CANNOT_GET_CART',
      success: false,
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = getCurrentCartByMarket;

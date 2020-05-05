const {
  savePaymentOnCart,
} = require('../useCases');

async function payments(request, response) {
  const userId = request.user._id;
  const marketId = request.params.marketId;

  const {
    payment,
    exchange,
    document,
  } = request.body;

  if (!payment) {
    return response.status(400).json({
      success: false,
      errors: [
        'Payment field is required',
      ],
      message: 'CANNOT_SAVE_PAYMENT_ON_CART',
    });
  }

  try {
    const updatedCart = await savePaymentOnCart(
      marketId, userId, {payment, exchange, document});

    return response.status(200).json({
      success: true,
      data: updatedCart,
      message: 'SAVE_PAYMENT_ON_CART',
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      errors: [
        exception.message,
      ],
      message: 'CANNOT_SAVE_PAYMENT_ON_CART',
    });
  }
}

module.exports = payments;

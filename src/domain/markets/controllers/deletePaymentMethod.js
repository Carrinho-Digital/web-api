const {
  deletePaymentMethod: deletePaymentMethodUseCase,
} = require('../useCases');

async function deletePaymentMethod(request, response) {
  const marketId = request.user._id;
  const paymentId = request.params.paymentId;

  try {
    await deletePaymentMethodUseCase(
      marketId,
      paymentId,
    );

    return response.status(200).json({
      success: true,
      message: 'PAYMENT_METHOD_DELETED',
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      message: 'CANNOT_DELETE_PAYMENT_METHOD',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = deletePaymentMethod;

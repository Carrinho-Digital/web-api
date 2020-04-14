const {
  upsertPaymentMethod,
} = require('../useCases');

async function updatePaymentMethod(request, response) {
  const marketId = request.user._id;
  const paymentId = request.params.paymentId;

  const { method, active } = request.body;

  if (!method || (typeof active !== 'boolean')) {
    return response.status(400).json({
      success: false,
      message: 'PAYMENT_METHOD_BAD_REQUEST',
      errors: [
        'method field is required',
        'active field is required',
        'active field must be boolean',
      ],
    });
  }

  try {
    await upsertPaymentMethod(paymentId, marketId, { method, active });

    return response.status(200).json({
      success: true,
      message: 'PAYMENTH_METHOD_UPDATED',
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      errors: [
        exception.message,
      ],
      message: 'CANNOT_UPDATE_PAYMENT_METHOD',
    });
  }
}

module.exports = updatePaymentMethod;

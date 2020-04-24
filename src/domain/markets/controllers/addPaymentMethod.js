const {
  upsertPaymentMethod,
} = require('../useCases');

async function addPaymentMethod(request, response) {
  const marketId = request.user._id;
  const { method, active } = request.body;

  if (!method) {
    return response.status(400).json({
      success: false,
      message: 'PAYMENT_METHOD_BAD_REQUEST',
      errors: [
        'method field is required',
      ],
    });
  }

  try {
    await upsertPaymentMethod(
      null,
      marketId,
      {
        active,
        method,
      },
    );

    return response.status(201).json({
      success: true,
      message: 'PAYMENT_METHOD_CREATED',
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      message: 'CANNOT_ADD_PAYMENT_METHOD',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = addPaymentMethod;

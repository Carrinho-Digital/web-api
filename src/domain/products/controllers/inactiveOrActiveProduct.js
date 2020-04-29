const {
  inactiveOrActiveProduct: inactiveOrActiveProductUseCase,
} = require('../useCases');

async function inactiveOrActiveProduct(request, response) {
  const marketId = request.user._id.toString();
  const productId = request.params.productId;

  const body = request.body;

  if (typeof body.inactive !== 'boolean') {
    return response.status(400).json({
      message: 'CANNOT_UPDATE_PRODUCT',
      errors: [
        'Inactive must be boolean',
      ],
      success: false,
    });
  }

  try {
    const updatedProduct = await inactiveOrActiveProductUseCase(
      marketId,
      productId,
      body.inactive,
    );

    return response.status(200).json({
      message: 'PRODUCT_UPDATED',
      success: true,
      data: updatedProduct,
      userId: marketId,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      message: 'CANNOT_UPDATE_PRODUCT',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = inactiveOrActiveProduct;

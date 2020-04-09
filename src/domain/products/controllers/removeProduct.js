const {
  removeProduct: removeProductUseCase,
} = require('../useCases');

async function removeProduct(request, response) {
  const isMarketUser = request.user.isMarket;

  if (!isMarketUser) {
    const isNotMarketUser = {
      message: 'IS_NOT_MARKET_USER',
      errors: [
        'Only market users can remove products',
      ],
      success: false,
    };

    return response.status(400).json(isNotMarketUser);
  }

  const productId = request.params.productId;
  const marketId = request.user._id;

  try {
    const removeProductResponse = await removeProductUseCase(
      productId,
      marketId,
    );

    if (!removeProductResponse) {
      return response.status(404).json({
        message: 'CANNOT_REMOVE_PRODUCT',
        errors: [
          'Product not found',
        ],
        success: false,
      });
    }

    return response.status(200).json({
      message: 'PRODUCT_REMOVED',
      success: true,
    });
  } catch (exception) {
    return response.status(422).json({
      message: 'CANNOT_REMOVE_PRODUCT',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = removeProduct;


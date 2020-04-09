const saveProductDto = require('../dto/saveProduct');
const {
  updateProduct: updateProductUseCase,
} = require('../useCases');

async function updateProduct(request, response) {
  const isMarketUser = request.user.isMarket;

  if (!isMarketUser) {
    const isNotMarketUser = {
      message: 'IS_NOT_MARKET_USER',
      errors: [
        'Only market users can update products',
      ],
      success: false,
    };

    return response.status(400).json(isNotMarketUser);
  }

  const updateProductRequestBody = request.body;
  const updateProductBody = saveProductDto.validate(updateProductRequestBody);

  if (updateProductBody.error) {
    return response.status(400).json(updateProductBody.error);
  }

  const productId = request.params.productId;

  try {
    const updateProductResponse = await updateProductUseCase(
      productId,
      request.user._id,
      updateProductBody.value,
    );

    if (!updateProductResponse) {
      return response.status(404).json({
        message: 'CANNOT_UPDATE_PRODUCT',
        errors: [
          'Product not found',
        ],
        success: false,
      });
    }

    return response.status(200).json({
      message: 'PRODUCT_UPDATED',
      data: updateProductResponse,
      success: true,
    });
  } catch (exception) {
    return response.status(422).json({
      message: 'CANNOT_UPDATE_PRODUCT',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = updateProduct;

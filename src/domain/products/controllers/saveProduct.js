const saveProductDto = require('../dto/saveProduct');
const {
  saveProduct: saveProductUseCase,
} = require('../useCases');

async function saveProduct(request, response) {
  const isMarketUser = request.user.isMarket;

  if (!isMarketUser) {
    const isNotMarketUser = {
      message: 'IS_NOT_MARKET_USER',
      errors: [
        'Only market users can add new products',
      ],
      success: false,
    };

    return response.status(400).json(isNotMarketUser);
  }

  const saveProductRequestBody = request.body;
  const saveProductBody = saveProductDto.validate(saveProductRequestBody);

  if (saveProductBody.error) {
    return response.status(400).json(saveProductBody.error);
  }

  try {
    const saveProductResponse = await saveProductUseCase(
      request.user._id,
      saveProductBody.value,
    );

    return response.status(201).json({
      message: 'PRODUCT_SAVED',
      data: saveProductResponse,
      success: true,
    });
  } catch (exception) {
    return response.status(422).json({
      message: 'CANNOT_SAVE_PRODUCT',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = saveProduct;

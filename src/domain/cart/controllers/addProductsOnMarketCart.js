const addProductsOnMarketCartDto = require('../dto/addProductsOnMarketCart');
const {
  addProductsOnMarketCart: addProductsOnMarketCartUseCase,
} = require('../useCases');

async function addProductsOnMarketCart(request, response) {
  const body = request.body;
  const userId = request.user._id;
  const marketId = request.params.marketId;

  const addProductsOnMarketCartBody = addProductsOnMarketCartDto.validate(body);

  if (addProductsOnMarketCartBody.error) {
    return response.status(400).json(addProductsOnMarketCartBody.error);
  }

  try {
    const productOnCart = await addProductsOnMarketCartUseCase(
      userId,
      marketId,
      addProductsOnMarketCartBody.value.products,
    );

    return response.status(201).json({
      success: true,
      message: 'PRODUCTS_ADDED_ON_MARKET_CART',
      data: productOnCart,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      message: 'CANNOT_ADD_PRODUCTS_ON_CART',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = addProductsOnMarketCart;

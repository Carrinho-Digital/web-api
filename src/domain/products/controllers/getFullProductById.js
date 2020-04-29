const {
  getProduct: getProductUseCase,
} = require('../useCases');

async function getProductById(request, response) {
  const productId = request.params.productId;
  const market = request.user._id;

  const searchParams = {
    fields: '-isDeleted',
    query: {
      isDeleted: false,
      market,
    },
  };

  try {
    const product = await getProductUseCase(
      productId,
      searchParams,
    );

    return response.status(200).json(product);
  } catch (exception) {
    return response.status(500).json({
      message: 'CANNOT_FIND_PRODUCT',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = getProductById;

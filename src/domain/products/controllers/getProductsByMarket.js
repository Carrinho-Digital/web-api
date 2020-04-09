const {
  getProductsByMarket: getProductsByMarketUseCase,
} = require('../useCases');

async function getProductsByMarket(request, response) {
  const marketId = request.params.marketId;

  const searchParams = {
    limit: parseInt(request.query.limit, 10) || 10,
    page: parseInt(request.query.page, 10) || 0,
  };

  if (!marketId) {
    return response.status(400).json({
      message: 'MARKET_ID_INVALID',
      errors: [
        'You must pass a valid market id',
      ],
      success: false,
    });
  }

  try {
    const marketProducts = await getProductsByMarketUseCase(
      marketId,
      searchParams,
    );

    return response.status(200).json(marketProducts);
  } catch (exception) {
    return response.status(500).json({
      message: 'CANNOT_RETRIVE_PRODUCTS',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = getProductsByMarket;

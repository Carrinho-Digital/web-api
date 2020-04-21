const {
  getMarketTags,
} = require('../useCases');

async function getCurrentMarketTags(request, response) {
  let marketId = null;

  if (request.user.type === 'MARKET_USER') {
    marketId = request.user._id;
  } else if (request.user.type === 'CUSTOMER_USER') {
    marketId = request.params.marketId;
  } else {
    return response.status(403).json({
      success: false,
      errors: [
        'Forbidden action',
      ],
      message: 'CANNOT_GET_MARKET_TAGS',
    });
  }

  try {
    const marketTags = await getMarketTags(marketId);

    return response.status(200).json({
      success: true,
      data: marketTags,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      errors: [
        exception.message,
      ],
      message: 'CANNOT_GET_MARKET_TAGS',
    });
  }
}

module.exports = getCurrentMarketTags;

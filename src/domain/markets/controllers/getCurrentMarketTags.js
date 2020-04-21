const {
  getMarketTags,
} = require('../useCases');

async function getCurrentMarketTags(request, response) {
  const marketId = request.user._id;

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

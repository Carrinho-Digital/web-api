const {
  favoriteMarket: favoriteMarketUseCase,
} = require('../useCases');

async function favoriteMarket(request, response) {
  const market = request.body.market;
  const isFavorite = request.body.favorite;
  const userId = request.user._id;

  if (!market) {
    return response.status(400).json({
      success: false,
      message: 'FAVORITE_MARKET_BAD_REQUEST',
      errors: [
        'market value must be string',
      ],
    });
  }

  if (typeof isFavorite !== 'boolean') {
    return response.status(400).json({
      success: false,
      message: 'FAVORITE_MARKET_BAD_REQUEST',
      errors: [
        'favorite value must be boolean',
      ],
    });
  }

  try {
    await favoriteMarketUseCase(market, userId, isFavorite);
    return response.status(200).json({
      success: true,
      message: isFavorite === true ? 'MARKET_FAVORITE' : 'MARKET_UNFAVORITE',
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      message: isFavorite === true ? 'CANNOT_FAVORITE' : 'CANNOT_UNFAVORITE',
      success: false,
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = favoriteMarket;

const { getSearchParams } = require('../../../utils/paginate');

const {
  getAllMarkets: getAllMarketsUseCase,
} = require('../useCases');

async function getAllMarkets(request, response) {
  const favorites = request.user.favorites || [];
  const searchParams = getSearchParams(request);

  function isFavorite(market) {
    return {
      ...market.toObject(),
      isFavorite: favorites.includes(market._id),
    };
  }

  try {
    const markets = await getAllMarketsUseCase(searchParams);
    markets.data = markets.data.map(isFavorite);

    return response.status(200).json(markets);
  } catch (exception) {
    return response.status(422).json({
      message: 'CANNOT_GET_ALL_MARKETS',
      success: false,
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = getAllMarkets;

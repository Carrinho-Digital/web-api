const { getSearchParams } = require('../../../utils/paginate');

const {
  getAllMarkets: getAllMarketsUseCase,
} = require('../../users/useCases');

async function getAllMarkets(request, response) {
  const searchParams = getSearchParams(request);

  try {
    const markets = await getAllMarketsUseCase(searchParams);
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

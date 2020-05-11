const { getSearchParams } = require('../../../utils/paginate');

const {
  getAllMarkets: getAllMarketsUseCase,
} = require('../useCases');

const {
  getAddressById: getAddressByIdUseCase,
} = require('../../users/useCases');

async function getAllMarkets(request, response) {
  const favorites = request.user.favorites || [];
  const searchParams = getSearchParams(request);
  const customerAddressId = request.params.customerAddressId || null;

  function isFavorite(market) {
    return {
      ...market,
      isFavorite: favorites.includes(market._id),
    };
  }

  function sortByDistance(firstMarket, secondMarket) {
    return firstMarket.distance > secondMarket.distance;
  }

  if (!customerAddressId) {
    return response.status(400).json({
      errors: [
        'customer address id is required',
      ],
      message: 'CANNOT_RETRIVE_MARKETS',
      success: false,
    });
  }

  try {
    const customerAddress = await getAddressByIdUseCase(
      customerAddressId,
      request.user._id,
    );

    const markets = await getAllMarketsUseCase(searchParams, customerAddress);
    markets.data = markets.data.map(isFavorite).sort(sortByDistance);

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

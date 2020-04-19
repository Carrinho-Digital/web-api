const { getSearchParams } = require('../../../utils/paginate');
const { getPromotion } = require('../useCases');

async function getPromotions(request, response) {
  const marketId = request.user._id;
  const searchParams = getSearchParams(request);

  try {
    const promotions = await getPromotion(
      marketId,
      searchParams,
    );

    return response.status(200).json(promotions);
  } catch (exception) {
    return response.status(exception.status || 500).json({
      errors: [
        exception.message,
      ],
      message: 'CANNOT_GET_PROMOTIONS',
      success: false,
    });
  }
}

module.exports = getPromotions;

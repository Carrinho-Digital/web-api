const {
  getPromotionById: getPromotionByIdUseCase,
} = require('../useCases');

async function getPromotionById(request, response) {
  const marketId = request.user._id;
  const promotionId = request.params.promotionId;

  try {
    const promotion = await getPromotionByIdUseCase(marketId, promotionId);
    return response.status(200).json(promotion);
  } catch (exception) {
    return response.status(exception.status || 500).json({
      message: 'CANNOT_GET_PROMOTION',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = getPromotionById;

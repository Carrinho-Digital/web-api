const {
  removePromotion: removePromotionUseCase,
} = require('../useCases');

async function removePromotion(request, response) {
  const marketId = request.user._id;
  const promotionId = request.params.promotionId;

  try {
    await removePromotionUseCase(promotionId, marketId);
    return response.status(200).json({
      success: true,
      message: 'PROMOTION_REMOVED',
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      message: 'CANNOT_REMOVE_PROMOTION',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = removePromotion;

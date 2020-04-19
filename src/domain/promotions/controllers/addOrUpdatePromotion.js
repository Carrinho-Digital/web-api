const promotionDto = require('../dto/pomotionDto');
const {
  PromotionsNotAvailable: PromotionsNotAvailableException,
} = require('../../../exceptions');
const {
  upsertPromotion: upsertPromotionUseCase,
} = require('../useCases');

async function addPromotion(request, response) {
  const marketId = request.user._id;
  const addPromotionBody = request.body;
  const promotionId = request.params.promotionId || null;

  const { error, value } = promotionDto.validate(addPromotionBody);

  if (error) {
    return response.status(400).json(error);
  }

  try {
    const promotion = await upsertPromotionUseCase(
      promotionId,
      marketId,
      value,
    );

    return response.status(201).json({
      message: 'PROMOTION_SAVED',
      data: promotion,
      success: true,
    });
  } catch (exception) {
    if (exception instanceof PromotionsNotAvailableException) {
      return response.status(exception.status).json({
        message: 'PROMOTION_NOT_AVAILABLE',
        errors: [
          exception.message,
        ],
        promotions: exception.promotions,
        success: false,
      });
    }

    return response.status(exception.status || 500).json({
      message: 'CANNOT_ADD_PROMOTION',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = addPromotion;

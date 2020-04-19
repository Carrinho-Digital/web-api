const { Promotion } = require('../models/promotion');
const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildRemovePromotion() {
  return async function removePromotion(promotionId, marketId) {
    const promotion = await Promotion.findOneAndDelete(
      {
        _id: promotionId,
        market: marketId,
      },
    );

    if (!promotion) {
      throw new NotFoundException('Could not found promotion');
    }

    return promotion;
  };
}

module.exports = buildRemovePromotion;

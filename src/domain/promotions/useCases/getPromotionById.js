const { Promotion } = require('../models/promotion');
const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildGetPromotionById() {
  return async function getPromotionById(marketId, promotionId) {
    const promotion = await Promotion.findOne(
      { _id: promotionId, market: marketId },
    );

    if (!promotion) {
      throw new NotFoundException('Cannot found promotion');
    }

    return promotion;
  };
}

module.exports = buildGetPromotionById;

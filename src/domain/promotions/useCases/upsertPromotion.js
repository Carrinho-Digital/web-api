const { Promotion } = require('../models/promotion');
const {
  General: GeneralException,
  PromotionsNotAvailable: PromotionsNotAvailableException,
} = require('../../../exceptions');

function buildUpsertPromotion({
  getProductById,
}) {
  function savePromotion(_promotion) {
    const promotion = new Promotion(_promotion);
    return promotion.save();
  }

  function updatePromotion(marketId, promotionId, _promotion) {
    return Promotion.findOneAndUpdate(
      {
        '_id': promotionId,
        'market': marketId,
      },
      _promotion,
      {
        new: true,
        upsert: false,
        rawResult: true,
      },
    );
  }

  // TODO: melhorar a validação das promoções
  async function isPromotionAvailable(promotion) {
    let promotions = [];

    if (promotion.productId) {
      if (promotion.undefinedTime === false) {
        promotions = await Promotion.find(
          {
            product: promotion.productId,
            startDate: {
              $lte: promotion.endDate,
            },
            endDate: {
              $gte: promotion.startDate,
            },
          },
        );
      } else {
        promotions = await Promotion.find(
          {
            product: promotion.productId,
            endDate: {
              $gte: new Date(),
            },
          },
        );
      }
    }

    return promotions;
  }

  return async function upsertPromotion(promotionId, marketId, promotion) {
    if (typeof promotion.undefinedTime !== 'boolean') {
      throw new GeneralException('The field undefinedTime must be boolean');
    }

    if (promotion.productId) {
      if (typeof promotion.productId !== 'string') {
        throw new GeneralException('The field productId must be string');
      }
      const product = await getProductById(promotion.productId);
      const productMarketId = product.market.toString();
      const currentMarketId = marketId.toString();

      if (productMarketId !== currentMarketId) {
        throw new GeneralException(
          'You cannot create a promotion for this product');
      }

      delete promotion.tags;
      promotion.productId = product._id;
    }

    if (promotion.tags) {
      if (!Array.isArray(promotion.tags)) {
        throw new GeneralException('The field tags must be array');
      }

      delete promotion.productId;
    }

    if (promotion.discountInPercent) {
      if (typeof promotion.discountInPercent !== 'number') {
        throw new GeneralException(
          'The field discountInPercent must be number');
      }
    }

    if (promotion.discountInPrice) {
      if (typeof promotion.discountInPrice !== 'number') {
        throw new GeneralException(
          'The field discountInPrice must be number');
      }
    }

    if (promotion.undefinedTime === false &&
        (!promotion.startDate || !promotion.endDate)) {
      throw new GeneralException('You must pass start and end date');
    }

    if (promotion.discountInPercent > 0 && promotion.discountInPrice > 0) {
      throw new GeneralException(
        'You cannot pass discountInPercent and discountInPrice at same time.');
    }

    if (promotion.undefinedTime === true) {
      delete promotion.startDate;
      delete promotion.endDate;
    }

    if (promotion.discountInPercent > 0) {
      delete promotion.discountInPrice;
    }

    if (promotion.discountInPrice > 0) {
      delete promotion.discountInPercent;
    }

    const promotionIsAvailable = await isPromotionAvailable(promotion);

    if (promotionIsAvailable.length > 0) {
      throw new PromotionsNotAvailableException(
        'Other promotions exists for the same time',
        promotionIsAvailable,
        422,
      );
    }

    if (!promotionId) {
      promotion.market = marketId;
      return savePromotion(promotion);
    }

    return updatePromotion(marketId, promotionId, promotion);
  };
}

module.exports = buildUpsertPromotion;

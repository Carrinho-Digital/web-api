const moment = require('moment');
const { Promotion } = require('../models/promotion');
const {
  General: GeneralException,
  PromotionsNotAvailable: PromotionsNotAvailableException,
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildUpsertPromotion(getProductById) {
  function savePromotion(_promotion) {
    const promotion = new Promotion(_promotion);
    return promotion.save();
  }

  async function updatePromotion(marketId, promotionId, _promotion) {
    const updated = await Promotion.findOneAndUpdate(
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

    if (updated.value) {
      return updated.value;
    }

    throw new NotFoundException('Cannot found promotion to update');
  }

  async function isPromotionAvailable(promotionId, promotion) {
    let promotionQuery = {};

    if (promotion.undefinedTime === false) {
      promotionQuery = {
        startDate: {
          $lte: promotion.endDate,
        },
        endDate: {
          $gte: promotion.startDate,
        },
      };
    } else {
      promotionQuery = {
        endDate: {
          $gte: new Date(),
        },
      };
    }

    if (promotion.product != null) {
      promotionQuery = {
        ...promotionQuery,
        product: promotion.product.toString(),
      };
    }

    if (promotion.tags && promotion.tags.length > 0) {
      promotionQuery = {
        ...promotionQuery,
        tags: {
          $all: promotion.tags,
        },
      };
    }

    if (promotionId) {
      promotionQuery = {
        ...promotionQuery,
        _id: {
          $ne: promotionId,
        },
      };
    }

    return await Promotion.find(promotionQuery);
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

      promotion.tags = [];
      delete promotion.productId;

      promotion.product = product._id;
    }

    if (promotion.tags && promotion.tags.length > 0) {
      if (!Array.isArray(promotion.tags)) {
        throw new GeneralException('The field tags must be array');
      }

      promotion.product = null;
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
      promotion.startDate = null;
      promotion.endDate = null;
    }

    if (promotion.undefinedTime === false) {
      promotion.startDate = moment(promotion.startDate).utc().format();
      promotion.endDate = moment(promotion.endDate).utc().format();
    }

    if (promotion.discountInPercent > 0) {
      promotion.discountInPrice = 0;
    }

    if (promotion.discountInPrice > 0) {
      promotion.discountInPercent = 0;
    }

    const promotionIsAvailable = await isPromotionAvailable(
      promotionId, promotion);

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

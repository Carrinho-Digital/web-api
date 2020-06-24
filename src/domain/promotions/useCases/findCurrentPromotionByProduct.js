const { Promotion } = require('../models/promotion');

function buildFindCurrentPromotionByProduct() {
  return async function findCurrentPromotionByProduct(
    product, marketId, searchDate = new Date(),
  ) {
    const currentDate = searchDate;

    const defaultQuery = {
      $or: [
        {
          startDate: {
            $lte: currentDate,
          },
          endDate: {
            $gte: currentDate,
          },
        },
        {
          undefinedTime: true,
        },
      ],
      market: marketId,
    };

    let promotion = null;

    promotion = await Promotion.findOne(
      {
        ...defaultQuery,
        product: product._id,
      },
    );

    if (!promotion && Array.isArray(product.tags)) {
      promotion = await product.tags.reduce(
        async (selectedPromotion, tag) => {
          const tagPromotion = await Promotion.findOne(
            {
              ...defaultQuery,
              tags: tag,
            },
          );

          if (tagPromotion) {
            return tagPromotion.toObject();
          }

          return selectedPromotion;
        }, null);
    }

    return promotion;
  };
}

module.exports = buildFindCurrentPromotionByProduct;

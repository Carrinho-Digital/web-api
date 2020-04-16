const Joi = require('@hapi/joi');

const promotionDto = Joi.object({
  startDate: Joi.when('undefinedTime', {
    is: false,
    then: Joi.date().required(),
  }).when('undefinedTime', {
    is: true,
    then: Joi.forbidden(),
  }),
  endDate: Joi.when('undefinedTime', {
    is: false,
    then: Joi.date().required(),
  }).when('undefinedTime', {
    is: true,
    then: Joi.forbidden(),
  }),
  undefinedTime: Joi.boolean().required(),
  discountInPercent: Joi.number(),
  discountInPrice: Joi.number(),
  tags: Joi.array().items(Joi.string()),
  productId: Joi.string(),
})
  .xor('discountInPercent', 'discountInPrice')
  .xor('tags', 'productId');

module.exports = promotionDto;

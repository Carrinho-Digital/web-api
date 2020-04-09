const Joi = require('@hapi/joi');

const saveProductDto = Joi.object({
  name: Joi
    .string()
    .max(150)
    .required(),
  description: Joi
    .string()
    .max(300)
    .required(),
  color: Joi.string(),
  inactive: Joi.boolean(),
  size: Joi.number(),
  unit: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  amount: Joi.number().required(),
  sku: Joi.string(),
  sellPrice: Joi.number().required(),
  buyPrice: Joi.number(),
  promotions: Joi.array().items(
    Joi.object({
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      discountInPercent: Joi.number(),
      discountInPrice: Joi.number(),
    }),
  ),
});

module.exports = saveProductDto;

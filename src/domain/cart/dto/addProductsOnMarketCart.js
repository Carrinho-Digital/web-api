const Joi = require('@hapi/joi');

const addProductsOnMarketCart = Joi.object({
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().required(),
    }),
  ).required(),
});

module.exports = addProductsOnMarketCart;

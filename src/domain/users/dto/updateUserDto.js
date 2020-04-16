const Joi = require('@hapi/joi');

const updateUserDto = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  document: Joi.string().required(),
  type: Joi.string().required(),
  category: Joi.number(),
  phones: Joi.array().items(Joi.string()).required(),
});

module.exports = updateUserDto;

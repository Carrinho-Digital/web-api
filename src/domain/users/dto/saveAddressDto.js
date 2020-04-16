const Joi = require('@hapi/joi');

const saveAddressDto = Joi.object({
  street: Joi.string().required(),
  number: Joi.string().required(),
  zipcode: Joi.string().required(),
  buildType: Joi.string().required(),
  reference: Joi.string(),
  neighborhood: Joi.string().required(),
});

module.exports = saveAddressDto;

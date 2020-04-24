const Joi = require('@hapi/joi');

const saveAddressDto = Joi.object({
  street: Joi.string().required(),
  number: Joi.string().required(),
  zipcode: Joi.string().required(),
  buildType: Joi.string().required(),
  reference: Joi.string(),
  neighborhood: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

module.exports = saveAddressDto;

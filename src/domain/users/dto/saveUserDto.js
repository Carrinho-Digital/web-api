const Joi = require('@hapi/joi');

const saveUserDto = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  confirm_password: Joi.ref('password'),
  email: Joi.string().email().required(),
  document: Joi.string().required(),
  type: Joi.string().required(),
  phones: Joi.array().items(Joi.string()).required(),
}).with('password', 'confirm_password');

module.exports = saveUserDto;

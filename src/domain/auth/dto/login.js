const Joi = require('@hapi/joi');

const loginDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).with('email', 'password');

module.exports = loginDto;

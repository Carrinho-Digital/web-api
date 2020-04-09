const logger = require('./logger');
const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.SECRET;
const issuer = process.env.ISSUER;
const audience = process.env.AUDIENCE;
const expireInMinutes = Number(process.env.EXPIRE_IN_MINUTES || 240);

function sign(payload = {}) {
  return jsonwebtoken.sign(payload, secret, {
    audience,
    issuer,
    expiresIn: `${expireInMinutes}m`,
  });
}

function verify(token) {
  try {
    return jsonwebtoken.verify(token, secret, {
      audience,
      issuer,
    });
  } catch (exception) {
    logger
      .error(
        'jsonwebtoken:verify exception',
        JSON.stringify(exception),
      );

    return null;
  }
}

module.exports = {
  sign,
  verify,
};

const { authorize } = require('../domain/users/useCases');

const unauthorizedMessage = {
  message: 'UNAUTHORIZED',
  errors: [
    'The token is invalid or dont exists',
  ],
};

function getBearerAuthToken(request) {
  const { authorization } = request.headers;

  if (!authorization) return null;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') return null;

  return token;
}

/**
 * O middleware de authenticação é responsável por criar uma
 * instância do usuário autenticado que está fazendo a requisiçaõ
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
async function authentication(request, response, next) {
  const token = getBearerAuthToken(request);

  if (!token) {
    return response.status(401).json(unauthorizedMessage);
  }

  const authorizedUser = await authorize(token);

  if (!authorizedUser) {
    return response.status(401).json(unauthorizedMessage);
  }

  request.user = {
    ...authorizedUser._doc,
    isCustomer: authorizedUser.type === 'CUSTOMER_USER',
    isMarket: authorizedUser.type === 'MARKET_USER',
  };

  next();
}

module.exports = authentication;

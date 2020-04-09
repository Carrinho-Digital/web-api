const unauthorizedMessage = {
  message: 'UNAUTHORIZED',
  errors: [
    'You dont have permission to perform this action',
  ],
};

/*
 * Este middleware é responsável por autorizar
 somente usuários autenticados que sejam customers
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
function only(type) {
  return async (request, response, next) => {
    const user = request.user;

    if (!user) {
      return response.status(403)
        .json(unauthorizedMessage);
    }

    if (user.type !== type) {
      return response.status(403)
        .json(unauthorizedMessage);
    }

    next();
  };
}

module.exports = only;

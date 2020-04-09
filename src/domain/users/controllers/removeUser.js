const { removeUser: removeUserUseCase } = require('../useCases');

async function removeUser(request, response) {
  const userId = request.user._id;

  try {
    await removeUserUseCase(userId);
    return response.sendStatus(204);
  } catch (exception) {
    return response.status(500).json({
      message: 'CANNOT_REMOVE_USER',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = removeUser;

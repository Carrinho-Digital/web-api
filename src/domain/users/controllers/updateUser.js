const updateUserDto = require('../dto/updateUserDto');
const { updateUser: updateUserUseCase } = require('../useCases');

async function updateUser(request, response) {
  const body = request.body;
  const userId = request.user._id;

  const updateUserBody = updateUserDto.validate(body);

  if (updateUserBody.error) {
    return response.status(400).json(updateUserBody.error);
  }

  try {
    await updateUserUseCase(userId, updateUserBody.value);
    return response.sendStatus(204);
  } catch (exception) {
    return response.status(500).json({
      message: 'CANNOT_UPDATE_USER',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = updateUser;

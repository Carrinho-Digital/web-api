const saveUserDto = require('../dto/saveUserDto');
const { createUser } = require('../useCases');

async function save(request, response) {
  const body = request.body;

  const saveBody = saveUserDto.validate(body);

  if (saveBody.error) {
    return response.status(400).json(saveBody.error);
  }

  try {
    const createdUser = await createUser(saveBody.value);

    return response.status(201).json({
      message: 'USER_CREATED',
      data: createdUser,
    });
  } catch (exception) {
    return response.status(500).json({
      message: 'CANNOT_SAVE_USER',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = save;

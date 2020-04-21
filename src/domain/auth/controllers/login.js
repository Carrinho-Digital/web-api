const loginDto = require('../dto/login');
const { login: loginUser } = require('../../users/useCases');

async function login(request, response) {
  const loginRequestBody = request.body;

  const loginBody = loginDto.validate(loginRequestBody);

  if (loginBody.error) {
    return response.status(400).json(loginBody.error);
  }

  const { email, password } = loginBody.value;

  try {
    const token = await loginUser(
      email,
      password,
      request.loginType,
    );

    if (!token) {
      return response.status(404).json({
        message: 'LOGIN_INVALID',
        errors: [
          'Email or password are not correct or user does not exists',
        ],
      });
    }

    return response.status(200).json({
      token,
    });
  } catch (exception) {
    return response.status(500).json({
      message: 'LOGIN_INVALID',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = login;

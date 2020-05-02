const {
  getUserById,
} = require('../useCases');

async function getCurrentUser(request, response) {
  const userId = request.user._id;

  try {
    const currentUser = await getUserById(userId);
    return response.status(200).json({
      message: 'CURRENT_USER',
      success: true,
      data: currentUser,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      message: 'CANNOT_GET_CURRENT_USER',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = getCurrentUser;

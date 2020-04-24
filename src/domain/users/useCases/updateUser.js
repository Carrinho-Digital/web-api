const User = require('../models/user');
const {
  General: GeneralException,
} = require('../../../exceptions');

function buildUpdateUser({ encrypt, getUserById }) {
  return async function updateUser(userId, userData) {
    const user = {...userData};

    if (user.type) {
      delete user.type;
    }

    const currentUser = await getUserById(userId);

    if (currentUser.type === 'MARKET_USER') {
      const categoryExists = User.getMarketCategory(user.category);

      if (!categoryExists) {
        throw new GeneralException('Category dont exists', 422);
      }
    }

    if (userData.type === 'CUSTOMER_USER') {
      if (!userData.birthDate) {
        throw new GeneralException('Birth date is required', 422);
      }

      const userDataBirthYear = new Date(userData.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();

      const userAge = currentYear - userDataBirthYear;

      if (userAge < 13 || userAge > 100) {
        throw new GeneralException('The birth date is not acceptable', 422);
      }
    }

    user.updatedAt = Date.now();

    return User.findByIdAndUpdate(userId, user);
  };
}

module.exports = buildUpdateUser;

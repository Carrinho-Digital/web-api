const User = require('../models/user');
const {
  General: GeneralException,
} = require('../../../exceptions');

function buildCreateUser({ encrypt }) {
  return async function createUser(userData) {
    const hash = await encrypt.hash(userData.password);

    if (!User.isValidType(userData.type)) {
      throw new GeneralException('Invalid type', 422);
    }

    if (userData.type === 'MARKET_USER') {
      const categoryExists = User.getMarketCategory(userData.category);

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

    const user = new User({
      ...userData,
      createdAt: Date.now(),
      password: hash,
    });

    return user.save();
  };
}


module.exports = buildCreateUser;

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

    const user = new User({
      ...userData,
      createdAt: Date.now(),
      password: hash,
    });

    return user.save();
  };
}


module.exports = buildCreateUser;

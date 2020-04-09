const User = require('../models/user');

function buildCreateUser({ encrypt }) {
  return async function createUser(userData) {
    const hash = await encrypt.hash(userData.password);

    if (!User.isValidType(userData.type)) {
      throw new Error('Invalid type');
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

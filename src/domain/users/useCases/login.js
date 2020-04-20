const User = require('../models/user');

function buildLogin({ encrypt, jwt, logger }) {
  return async function login(
    email, password, loginType,
  ) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return null;
      }

      if (user.isDeleted) {
        return null;
      }

      if (user.type !== loginType) {
        return null;
      }

      const passwordMatch = await encrypt
        .compare(password, user.password);

      if (!passwordMatch) return null;

      return await jwt.sign({ email: user.email, type: user.type });
    } catch (exception) {
      logger.error('login exception', {
        message: exception.message,
        who: {
          email, password,
        },
      });

      return null;
    }
  };
}

module.exports = buildLogin;

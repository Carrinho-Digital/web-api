const User = require('../models/user');

function buildAuthorize({ jwt }) {
  const userIsDeleted = user => user.isDeleted;

  return async function authorize(token) {
    if (!token) return null;

    const decodedToken = await jwt.verify(token);

    if (!decodedToken) return null;

    const email = decodedToken.email;

    if (!email) return null;

    const user = await User.findOne({ email });

    if (!user) return null;

    if (userIsDeleted(user)) return null;

    return user;
  };
}

module.exports = buildAuthorize;

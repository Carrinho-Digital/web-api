const User = require('../models/user');

function buildAuthorize({ events, jwt }) {
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

    events.fire(events.getEvents.AUTHORIZE_DONE, user);

    return user;
  };
}

module.exports = buildAuthorize;

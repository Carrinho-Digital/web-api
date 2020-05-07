const User = require('../models/user');

function buildFacebookLogin({ jwt }) {
  return async function facebookLogin(
    accessToken,
    refreshToken,
    profile,
  ) {
    let user = await User.findOne(
      {
        'facebook.id': profile.id,
        'type': 'CUSTOMER_USER',
        'isDeleted': false,
      },
    );

    if (!user) {
      const name = profile.displayName;
      const userEmail = profile.emails[0].value;

      const newUser = {
        name,
        email: userEmail,
        createdAt: new Date,
        updatedAt: new Date,
        type: 'CUSTOMER_USER',
        facebook: {
          id: profile.id,
          token: accessToken,
        },
      };

      user = User(newUser).save();
    }

    return jwt.sign({ email: user.email, type: user.type });
  };
}

module.exports = buildFacebookLogin;

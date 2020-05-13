// TODO: terminar o login social com passport
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

const { facebookLogin } = require('../domain/users/useCases');

module.exports = () => {
  passport.use(new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      profileFields: [
        'id', 'displayName',
        'birthday', 'name', 'gender', 'link', 'photos', 'email'],
    },
    function(accessToken, refreshToken, profile, done) {
      facebookLogin(accessToken, refreshToken, profile)
        .then(token => done(null, token))
        .catch(err => done(err, null));
    },
  ));
};

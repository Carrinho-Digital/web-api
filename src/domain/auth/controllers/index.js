const passport = require('passport');
const router = require('express').Router();

const login = require('./login');

function loginMarket(request, response, next) {
  request.loginType = 'MARKET_USER';
  next();
}

function loginCustomer(request, response, next) {
  request.loginType = 'CUSTOMER_USER';
  next();
}

router.post('/login', loginCustomer, login);
router.post('/login/market', loginMarket, login);

router.post(
  '/login/facebook',
  passport.authenticate('facebook-token', { session: false }),
  (request, response) => {
    return response.json({
      token: request.user,
    });
  },
);

module.exports = router;

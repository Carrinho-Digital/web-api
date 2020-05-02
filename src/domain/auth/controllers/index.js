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

module.exports = router;

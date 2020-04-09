const router = require('express').Router();

const getAllMarkets = require('./getAllMarkets');

router.get('/', getAllMarkets);

module.exports = router;

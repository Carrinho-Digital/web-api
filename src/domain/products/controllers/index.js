const router = require('express').Router();

const getProducts = require('./getProducts');
const getProduct = require('./getProductById');
const getProductsByMarket = require('./getProductsByMarket');
const saveProduct = require('./saveProduct');
const updateProduct = require('./updateProduct');
const removeProduct = require('./removeProduct');
const { authentication } = require('../../../middleware');

router.get('/', authentication, getProducts);
router.get('/:productId', authentication, getProduct);
router.get('/market/:marketId', authentication, getProductsByMarket);

router.post('/', authentication, saveProduct);

router.put('/:productId', authentication, updateProduct);

router.delete('/:productId', authentication, removeProduct);

module.exports = router;

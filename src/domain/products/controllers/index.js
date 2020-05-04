const multer = require('multer');
const router = require('express').Router();
const { authentication, only } = require('../../../middleware');

const getProducts = require('./getProducts');
const getProduct = require('./getProductById');
const getFullProduct = require('./getFullProductById');
const getProductsByMarket = require('./getProductsByMarket');
const saveProduct = require('./saveProduct');
const updateProduct = require('./updateProduct');
const inactiveOrActiveProduct = require('./inactiveOrActiveProduct');
const removeProduct = require('./removeProduct');
const saveProductImages = require('./saveProductImages');
const removeProductImage = require('./removeProductImage');

const uploader = multer();

router.get(
  '/',
  authentication,
  only('MARKET_USER'),
  getProducts,
);

router.get('/:productId', authentication, getProduct);

router.get(
  '/cli/market/:marketId',
  authentication,
  only('CUSTOMER_USER'),
  getProductsByMarket,
);

router.get(
  '/market/:productId',
  authentication,
  only('MARKET_USER'),
  getFullProduct,
);


router.post('/', authentication, saveProduct);
router.post(
  '/images',
  uploader.array('images'),
  authentication,
  only('MARKET_USER'),
  saveProductImages,
);

router.put(
  '/images/remove/:productId',
  authentication,
  only('MARKET_USER'),
  removeProductImage,
);
router.put(
  '/images/:productId?',
  uploader.array('images'),
  authentication,
  only('MARKET_USER'),
  saveProductImages,
);
router.put('/:productId', authentication, updateProduct);

router.patch(
  '/inactive/:productId',
  authentication,
  only('MARKET_USER'),
  inactiveOrActiveProduct);

router.delete('/:productId', authentication, removeProduct);

module.exports = router;

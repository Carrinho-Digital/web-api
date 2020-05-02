const { paginate } = require('../../../utils/paginate');
const _buildFindCurrentPromotion =
  require('../../promotions/useCases/findCurrentPromotionByProduct');

const _findCurrentPromotion = _buildFindCurrentPromotion();

const buildGetAllProducts = require('./getAllProducts');
const buildGetProduct = require('./getProduct');
const buildGetProductsByMarket = require('./getProductsByMarket');
const buildSaveProduct = require('./saveProduct');
const buildUpdateProduct = require('./updateProduct');
const buildRemoveProduct = require('./removeProduct');
const buildBelowsToMarket = require('./belowsToMarket');
const buildProductHasQuantity = require('./productHasQuantity');
const buildGetProductById = require('./getProductById');
const buildInactiveOrActiveProduct = require('./inactiveOrActiveProduct');

const inactiveOrActiveProduct = buildInactiveOrActiveProduct();
const getAllProducts = buildGetAllProducts(paginate);
const getProductsByMarket = buildGetProductsByMarket({
  paginate,
  findCurrentPromotionByProduct: _findCurrentPromotion,
});
const saveProduct = buildSaveProduct();
const updateProduct = buildUpdateProduct();
const removeProduct = buildRemoveProduct();
const getProduct = buildGetProduct();
const belowsToMarket = buildBelowsToMarket();
const productHasQuantity = buildProductHasQuantity();
const getProductById = buildGetProductById();

module.exports = {
  getProductById,
  getAllProducts,
  belowsToMarket,
  saveProduct,
  updateProduct,
  removeProduct,
  getProduct,
  getProductsByMarket,
  productHasQuantity,
  inactiveOrActiveProduct,
};

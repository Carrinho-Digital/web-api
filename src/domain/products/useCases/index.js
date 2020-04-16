const { paginate } = require('../../../utils/paginate');

const buildGetAllProducts = require('./getAllProducts');
const buildGetProduct = require('./getProduct');
const buildGetProductsByMarket = require('./getProductsByMarket');
const buildSaveProduct = require('./saveProduct');
const buildUpdateProduct = require('./updateProduct');
const buildRemoveProduct = require('./removeProduct');
const buildBelowsToMarket = require('./belowsToMarket');
const buildProductHasQuantity = require('./productHasQuantity');
const buildGetProductById = require('./getProductById');

const getAllProducts = buildGetAllProducts(paginate);
const getProductsByMarket = buildGetProductsByMarket(paginate);
const saveProduct = buildSaveProduct();
const updateProduct = buildUpdateProduct();
const removeProduct = buildRemoveProduct();
const getProduct = buildGetProduct();
const belowsToMarket = buildBelowsToMarket();
const productHasQuantity = buildProductHasQuantity();
const getProductById = buildGetProductById();

module.exports = {
  getAllProducts,
  belowsToMarket,
  saveProduct,
  updateProduct,
  removeProduct,
  getProduct,
  getProductsByMarket,
  productHasQuantity,
  getProductById,
};

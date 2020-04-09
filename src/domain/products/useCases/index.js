const { paginate } = require('../../../utils/paginate');

const buildGetAllProducts = require('./getAllProducts');
const buildGetProductById = require('./getProductById');
const buildGetProductsByMarket = require('./getProductsByMarket');
const buildSaveProduct = require('./saveProduct');
const buildUpdateProduct = require('./updateProduct');
const buildRemoveProduct = require('./removeProduct');
const buildBelowsToMarket = require('./belowsToMarket');
const buildProductHasQuantity = require('./productHasQuantity');

const getAllProducts = buildGetAllProducts(paginate);
const getProductsByMarket = buildGetProductsByMarket(paginate);
const saveProduct = buildSaveProduct();
const updateProduct = buildUpdateProduct();
const removeProduct = buildRemoveProduct();
const getProductById = buildGetProductById();
const belowsToMarket = buildBelowsToMarket();
const productHasQuantity = buildProductHasQuantity();

module.exports = {
  getAllProducts,
  belowsToMarket,
  saveProduct,
  updateProduct,
  removeProduct,
  getProductById,
  getProductsByMarket,
  productHasQuantity,
};

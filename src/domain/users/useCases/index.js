const encrypt = require('../../../lib/encrypt');
const jwt = require('../../../lib/jwt');
const logger = require('../../../lib/logger');
const { paginate } = require('../../../utils/paginate');

const buildGetAllMarkets = require('./getAllMarkets');
const buildCreateUser = require('./createUser');
const buildUpdateUser = require('./updateUser');
const buildRemoveUser = require('./removeUser');
const buildAuthorize = require('./authorize');
const buildLogin = require('./login');
const buildGetAddresses = require('./getAddresses');
const buildRemoveUserAddress = require('./removeUserAddress');
const buildUpsertUserAddress = require('./upsertUserAddress');

const getAllMarkets = buildGetAllMarkets(paginate);
const createUser = buildCreateUser({ encrypt });
const updateUser = buildUpdateUser({ encrypt });
const removeUser = buildRemoveUser();
const authorize = buildAuthorize({ jwt });
const login = buildLogin({ encrypt, jwt, logger });
const getAddresses = buildGetAddresses();
const removeUserAddress = buildRemoveUserAddress();
const upsertUserAddress = buildUpsertUserAddress();

module.exports = {
  createUser,
  getAllMarkets,
  updateUser,
  removeUser,
  authorize,
  login,
  getAddresses,
  removeUserAddress,
  upsertUserAddress,
};

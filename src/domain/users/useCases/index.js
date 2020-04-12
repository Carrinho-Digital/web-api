const encrypt = require('../../../lib/encrypt');
const jwt = require('../../../lib/jwt');
const logger = require('../../../lib/logger');

const buildCreateUser = require('./createUser');
const buildUpdateUser = require('./updateUser');
const buildRemoveUser = require('./removeUser');
const buildAuthorize = require('./authorize');
const buildLogin = require('./login');
const buildGetAddresses = require('./getAddresses');
const buildRemoveUserAddress = require('./removeUserAddress');
const buildUpsertUserAddress = require('./upsertUserAddress');
const buildGetUserById = require('./getUserById');

const createUser = buildCreateUser({ encrypt });
const updateUser = buildUpdateUser({ encrypt });
const removeUser = buildRemoveUser();
const authorize = buildAuthorize({ jwt });
const login = buildLogin({ encrypt, jwt, logger });
const getAddresses = buildGetAddresses();
const removeUserAddress = buildRemoveUserAddress();
const upsertUserAddress = buildUpsertUserAddress();
const getUserById = buildGetUserById();

module.exports = {
  createUser,
  updateUser,
  removeUser,
  authorize,
  getUserById,
  login,
  getAddresses,
  removeUserAddress,
  upsertUserAddress,
};

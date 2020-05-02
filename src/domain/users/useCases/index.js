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
const buildGetAddressById = require('./getAddressById');
const buildGetUserById = require('./getUserById');

const getUserById = buildGetUserById();
const createUser = buildCreateUser({ encrypt });
const updateUser = buildUpdateUser({ encrypt, getUserById });
const removeUser = buildRemoveUser();
const authorize = buildAuthorize({ jwt });
const login = buildLogin({ encrypt, jwt, logger });
const getAddresses = buildGetAddresses();
const getAddressById = buildGetAddressById({
  getAddresses,
});
const removeUserAddress = buildRemoveUserAddress();
const upsertUserAddress = buildUpsertUserAddress();

module.exports = {
  createUser,
  updateUser,
  removeUser,
  authorize,
  getUserById,
  login,
  getAddressById,
  getAddresses,
  removeUserAddress,
  upsertUserAddress,
};

const router = require('express').Router();

const { authentication } = require('../../../middleware');

const createMarketUser = require('./createMarketUser');
const createCustomerUser = require('./createCustomerUser');

const updateUser = require('./updateUser');
const removeUser = require('./removeUser');
const addAddress = require('./addAddress');
const updateAddress = require('./updateAddress');
const removeAddress = require('./removeAddress');
const getAddresses = require('./getAddresses');
const getCurrentUser = require('./getCurrentUser');

router.post('/market', createMarketUser);
router.post('/customer', createCustomerUser);

router.put('/', authentication, updateUser);
router.delete('/', authentication, removeUser);

router.get('/addresses', authentication, getAddresses);
router.post('/addresses', authentication, addAddress);
router.put('/addresses/:addressId', authentication, updateAddress);
router.delete('/addresses/:addressId', authentication, removeAddress);

router.get('/current', authentication, getCurrentUser);

module.exports = router;

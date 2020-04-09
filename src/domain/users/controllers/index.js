const router = require('express').Router();

const { authentication } = require('../../../middleware');

const saveUser = require('./saveUser');
const updateUser = require('./updateUser');
const removeUser = require('./removeUser');
const addAddress = require('./addAddress');
const updateAddress = require('./updateAddress');
const removeAddress = require('./removeAddress');
const getAddresses = require('./getAddresses');

router.post('/', saveUser);
router.put('/', authentication, updateUser);
router.delete('/', authentication, removeUser);

router.get('/addresses', authentication, getAddresses);
router.post('/addresses', authentication, addAddress);
router.put('/addresses/:addressId', authentication, updateAddress);
router.delete('/addresses/:addressId', authentication, removeAddress);

module.exports = router;

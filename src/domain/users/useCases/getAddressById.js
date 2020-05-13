const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildGetAddressById({
  getAddresses,
}) {
  return async function getAddressById(addressId, userId) {
    const addresses = await getAddresses(userId);

    if (!addresses || addresses.length < 1) {
      throw new NotFoundException('Cannot found user address');
    }

    return addresses.id(addressId);
  };
}

module.exports = buildGetAddressById;

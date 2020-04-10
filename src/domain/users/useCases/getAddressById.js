function buildGetAddressById({
  getAddresses,
}) {
  return async function getAddressById(addressId, userId) {
    const addresses = await getAddresses(userId);

    if (!addresses || addresses.length < 1) {
      return null;
    }

    return addresses.id(addressId);
  };
}

module.exports = buildGetAddressById;

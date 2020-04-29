function buildGetDeliveryAvailabilities({
  getUserById,
}) {
  return async function getDeliveryAvailabilities(marketId) {
    const marketUser = await getUserById(marketId);
    return marketUser.deliveryAvailabilities;
  };
}

module.exports = buildGetDeliveryAvailabilities;

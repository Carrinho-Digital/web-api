function buildGetPaymentMethods({
  getUserById,
}) {
  return async function getPaymentMethods(marketId) {
    const marketUser = await getUserById(marketId);
    return marketUser.paymentMethods;
  };
}

module.exports = buildGetPaymentMethods;

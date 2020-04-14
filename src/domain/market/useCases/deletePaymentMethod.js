const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildDeletePaymentMethod({
  getUserById,
}) {
  return async function deletePaymentMethod(marketId, paymentId) {
    const marketUser = await getUserById(marketId);

    const paymentMethod = marketUser.paymentMethods.id(paymentId);

    if (!paymentMethod) {
      throw new NotFoundException('Payment method could not be found');
    }

    paymentMethod.remove();

    await marketUser.save();
  };
}

module.exports = buildDeletePaymentMethod;

const {
  General: GeneralException,
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildSavePaymentOnCart({
  getCurrentCartByMarket,
  getPaymentMethods,
}) {
  async function retrivePaymentMethod(marketId, payment) {
    const marketPaymentMethods = await getPaymentMethods(marketId);

    if (!marketPaymentMethods || !Array.isArray(marketPaymentMethods)) {
      throw new GeneralException('Market dont support this payment', 422);
    }

    const paymentMethod = marketPaymentMethods.find(method =>
      method._id.toString() === payment.toString());

    if (!paymentMethod) {
      throw new NotFoundException('Cannot found payment method');
    }

    return paymentMethod;
  }

  return async function savePaymentOnCart(
    marketId,
    userId,
    {
      payment,
      exchange,
      document,
    },
  ) {
    const paymentMethod = await retrivePaymentMethod(marketId, payment);

    const { cart: currentCart, total } = await getCurrentCartByMarket(
      marketId, userId);

    const totalToPay = total.cart + total.delivery;

    if (paymentMethod.method === 'DINHEIRO' &&
        typeof exchange !== 'number') {
      throw new GeneralException('Exchange is required and must be a number');
    }

    if (paymentMethod.method === 'DINHEIRO' && exchange < totalToPay) {
      throw new GeneralException('You dont have sufficient founds', 422);
    }

    const paymentToSave = {
      document,
      method: paymentMethod.method,
      exchange: paymentMethod.method !== 'DINHEIRO' ? 0 : exchange,
    };

    currentCart.payment = paymentToSave;
    currentCart.updatedAt = new Date();

    return currentCart.save();
  };
}

module.exports = buildSavePaymentOnCart;

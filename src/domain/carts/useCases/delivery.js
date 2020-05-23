const {
  NotFound: NotFoundException,
  General: GeneralException,
} = require('../../../exceptions');

function buildDelivery({
  getAddressById,
  getCurrentCartByMarket,
}) {
  return async function delivery(method, addressId, marketId, userId) {
    const { cart: currentCart } = await getCurrentCartByMarket(
      marketId,
      userId,
    );

    if (!currentCart) {
      throw new NotFoundException('Cart not found');
    }

    if (method === 'pickup') {
      currentCart.delivery = {
        method,
        address: null,
      };
    }

    if (method === 'delivery') {
      if (!addressId) {
        throw new GeneralException('Address cannot be found', 422);
      }

      const userAddressToDelivery = await getAddressById(addressId, userId);

      currentCart.delivery = {
        method,
        address: userAddressToDelivery.id,
      };
    }

    try {
      currentCart.updatedAt = new Date();
      await currentCart.save();
    } catch (exception) {
      throw new GeneralException('Address could be invalid');
    }
  };
}

module.exports = buildDelivery;

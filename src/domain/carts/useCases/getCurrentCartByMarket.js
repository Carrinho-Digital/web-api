const { Cart } = require('../models/cart');
const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildGetCurrentCartByMarket({
  getUserById,
  marketExists,
  deliveryPrice,
  deliveryDistance,
} = {}) {
  return async function getCurrentCartByMarket(marketId, userId) {
    try {
      const marketDontExists = !(await marketExists(marketId));

      if (marketDontExists) {
        throw new NotFoundException('Market cannot be found');
      }
    } catch (exception) {
      throw new NotFoundException('Market cannot be found');
    }

    const market = await getUserById(marketId);

    const cart = await Cart.findOne({
      user: userId,
      market: marketId,
      closed: false,
    }).populate('user');

    if (!cart) {
      return {
        cart: null,
        total: {
          cart: 0,
          delivery: 0,
        },
      };
    }

    const deletedOrInexistent = await cart.hasDeletedOrInexistentProducts();

    if (Array.isArray(deletedOrInexistent) && deletedOrInexistent.length > 0) {
      const ids = deletedOrInexistent.map(({ _id }) => _id.toString());

      const remainingProducts = cart.products.filter(
        product => !ids.includes(product._id.toString()));

      cart.products = remainingProducts;
      await cart.save();
    }

    const totalPriceOfProducts = await cart.totalPriceOfProducts();

    let totalPriceOfDelivery = 0;

    if (!market.freeDelivery &&
        cart.delivery &&
        cart.delivery.method === 'delivery'
    ) {
      try {
        const distanceToCustomer = await deliveryDistance(
          cart.delivery.address,
          userId,
          marketId,
        );

        const distanceToCustomerInKm = distanceToCustomer / 1000;

        totalPriceOfDelivery = await deliveryPrice(
          distanceToCustomerInKm,
          marketId,
        );
      } catch (exception) {
        totalPriceOfDelivery = 0;
      }
    }

    return {
      cart,
      total: {
        cart: totalPriceOfProducts,
        delivery: totalPriceOfDelivery,
      },
    };
  };
}

module.exports = buildGetCurrentCartByMarket;

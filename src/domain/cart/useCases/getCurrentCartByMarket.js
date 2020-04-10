const { Cart } = require('../models/cart');
const { NotFound: NotFoundException } = require('../../../exceptions');

function buildGetCurrentCartByMarket({
  marketExists,
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

    const cart = await Cart.findOne({
      user: userId,
      market: marketId,
      closed: false,
    });

    let total = 0;

    if (cart) {
      total = await cart.total();
    }

    return {
      cart,
      total,
    };
  };
}

module.exports = buildGetCurrentCartByMarket;

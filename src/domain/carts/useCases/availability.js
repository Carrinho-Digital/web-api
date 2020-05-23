const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildAvailability({
  getCurrentCartByMarket,
  findMarketAvailability,
}) {
  return async function availability(
    marketId,
    userId,
    { to, from },
  ) {
    const { cart: currentCart } = await getCurrentCartByMarket(
      marketId,
      userId,
    );

    if (!currentCart) {
      throw new NotFoundException('Cart not found');
    }

    const availability = await findMarketAvailability(
      marketId, from, to);

    if (!availability) {
      throw new NotFoundException('Market dont have availability');
    }

    currentCart.availability = {
      to,
      from,
    };

    currentCart.updatedAt = new Date();

    return currentCart.save();
  };
}

module.exports = buildAvailability;

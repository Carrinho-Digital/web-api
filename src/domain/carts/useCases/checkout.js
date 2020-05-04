// TODO: terminar o checkout

function buildCheckout({
  getCurrentCartByMarket,
}) {
  return async function checkout(marketId, userId) {
    const {
      cart: currentCart,
      total: cartTotal,
    } = await getCurrentCartByMarket(marketId, userId);

    return {
      currentCart, cartTotal,
    };
  };
}

module.exports = buildCheckout;

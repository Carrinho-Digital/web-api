const {
  General: GeneralException,
} = require('../../../exceptions');

function buildCheckout({
  getUserById,
  getCurrentCartByMarket,
  marketHasProductsInTheCart,
}) {
  function cartIsClosed(cart) {
    return cart.closed === true;
  }

  function cartHasDelivery(cart) {
    if (!cart.delivery) return false;

    const { method, address } = cart.delivery;

    if (method === 'pickup') return true;

    if (method === 'delivery' && !address) return false;

    return true;
  }

  function cartHasPaymentMethod(
    cart,
    { cart: cartValue, delivery: deliveryValue },
  ) {
    if (!cart.payment) return false;

    if (cart.payment.method === 'DINHEIRO') {
      const exchange = Number(cart.payment.exchange);
      const exchangeIsNaN = isNaN(exchange);

      if (exchangeIsNaN) return false;
      const cartTotal = cartValue + deliveryValue;

      if (exchange < cartTotal) return false;
    }
    return true;
  }

  function cartHasAvailabilityDelivery(cart) {
    if (!cart.availability) return false;
    return true;
  }

  function cartHasProducts(cart) {
    if (!cart.products) return false;
    return cart.products.length > 0;
  }

  return async function checkout(marketId, userId) {
    const {
      cart: currentCart,
      total: cartTotal,
    } = await getCurrentCartByMarket(marketId, userId);

    if (cartIsClosed(currentCart)) {
      throw new GeneralException('Cart is already closed', 400);
    }

    if (!cartHasDelivery(currentCart)) {
      throw new GeneralException('Cart has not delivery method', 422);
    }

    if (!cartHasPaymentMethod(currentCart, cartTotal)) {
      throw new GeneralException(
        'Cart has not payment method or you have not sufficient founds', 422);
    }

    if (currentCart.delivery.method === 'delivery') {
      if (!cartHasAvailabilityDelivery(currentCart)) {
        throw new GeneralException('Cart has not availability delivery', 422);
      }
    }

    if (!cartHasProducts(currentCart)) {
      throw new GeneralException('Cart must have at least 1 product', 422);
    }

    const isAllProductsOk = await marketHasProductsInTheCart(
      currentCart.products,
      marketId,
    );

    if (!isAllProductsOk) {
      throw new GeneralException(
        'Some products are not available on the market', 422);
    }

    return {
      currentCart, cartTotal,
    };
  };
}

module.exports = buildCheckout;

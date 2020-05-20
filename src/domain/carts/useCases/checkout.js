const moment = require('moment');
const {
  General: GeneralException,
  NotFound: NotFoundException,
} = require('../../../exceptions');


function buildCheckout({
  getProductById,
  productHasQuantity,
  getCurrentCartByMarket,
  findMarketAvailability,
}) {
  function cartHasPaymentMethod(
    cart,
    { cart: cartValue, delivery: deliveryValue },
  ) {
    if (!cart.payment) return false;

    const { method } = cart.payment;

    if (!method) return false;

    if (method === 'DINHEIRO') {
      const exchange = Number(cart.payment.exchange);
      const exchangeIsNaN = isNaN(exchange);

      if (exchangeIsNaN) return false;
      const cartTotal = cartValue + deliveryValue;

      if (exchange < cartTotal) return false;
    }

    return true;
  }

  async function allProductsHaveEnoughStock(productOnCart) {
    const productId = productOnCart.product;
    const productQuantity = productOnCart.quantity;

    try {
      const marketHasProductQuantity = await productHasQuantity(
        productId, productQuantity);

      return marketHasProductQuantity;
    } catch (exception) {
      if (exception instanceof NotFoundException) {
        throw exception;
      }

      throw new GeneralException(
        exception.message, exception.statusCode || 422);
    }
  }

  async function grabProductFromShelf(productOnCart) {
    const productId = productOnCart.product;
    const productQuantity = productOnCart.quantity;

    const product = await getProductById(productId);
    const quantityAfterGrab = product.amount - Number(productQuantity);

    product.amount = quantityAfterGrab;
    const updatedProduct = await product.save();

    return updatedProduct;
  }

  return async function checkout(marketId, userId) {
    const {
      cart: currentCart,
      total: cartTotal,
    } = await getCurrentCartByMarket(marketId, userId);

    if (currentCart.isClosed()) {
      throw new GeneralException('Cart is already closed', 400);
    }

    if (!currentCart.hasDelivery()) {
      throw new GeneralException('Cart has not delivery method', 422);
    }

    if (!currentCart.hasProducts()) {
      throw new GeneralException('Cart must have at least 1 product', 422);
    }

    if (!cartHasPaymentMethod(currentCart, cartTotal)) {
      throw new GeneralException(
        'Cart has not payment method or you have not sufficient founds', 422);
    }

    if (currentCart.delivery.method === 'delivery') {
      currentCart.setDeliveryPrice(cartTotal.delivery);

      if (!currentCart.hasAvailability()) {
        throw new GeneralException('Cart has not availability delivery', 422);
      }

      const customerAvailabilityFrom = moment(
        currentCart.availability.from).utc();

      const customerAvailabilityTo = moment(
        currentCart.availability.to).utc();

      const marketHasAvailability = await findMarketAvailability(
        marketId, customerAvailabilityFrom, customerAvailabilityTo);

      if (!marketHasAvailability) {
        throw new GeneralException('Cart has not availability delivery', 422);
      }
    }

    const promisseIsAllProductsOk = currentCart.products
      .map(allProductsHaveEnoughStock);

    const allProductsIsOk = await Promise.all(promisseIsAllProductsOk);

    if (!allProductsIsOk.every(hasStock => hasStock === true)) {
      throw new GeneralException('Some products have not enough quantity', 412);
    }

    const updateProductStockPromisse = currentCart.products
      .map(grabProductFromShelf);

    await Promise.all(updateProductStockPromisse);

    await currentCart.closeCart();
    await currentCart.save();

    return currentCart;
  };
}

module.exports = buildCheckout;

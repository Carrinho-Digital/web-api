const { Cart } = require('../models/cart');
const { General: GeneralException } = require('../../../exceptions');

function buildAddProductsOnMarketCart({
  getCurrentCartByMarket,
  marketHasProductsInTheCart,
} = {}) {
  function createCart(marketId, userId) {
    const cart = new Cart({
      user: userId,
      market: marketId,
      closed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      products: [],
    });

    return cart.save();
  }

  function addProductsOnCart(cart, products) {
    cart.products = products;
    cart.updatedAt = new Date();
    return cart.save();
  }

  return async function addProductsOnMarketCart(
    userId, marketId, productsInfo = [],
  ) {
    let { cart: currentUserCartOnMarket } = await getCurrentCartByMarket(
      marketId,
      userId,
    );

    if (!currentUserCartOnMarket) {
      currentUserCartOnMarket = await createCart(marketId, userId);
    }

    const isAllProductsOk = await marketHasProductsInTheCart(
      productsInfo,
      marketId,
    );

    if (!isAllProductsOk) {
      throw new GeneralException(
        'Product dont bellows to market or dont have enough quantity',
        422,
      );
    }

    try {
      const productsAdded = await addProductsOnCart(
        currentUserCartOnMarket,
        productsInfo,
      );

      return productsAdded;
    } catch (exception) {
      throw new GeneralException('Problems to add products on cart', 500);
    }
  };
}

module.exports = buildAddProductsOnMarketCart;

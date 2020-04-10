const { Cart } = require('../models/cart');
const { General: GeneralException } = require('../../../exceptions');

function buildAddProductsOnMarketCart({
  getCurrentCartByMarket,
  belowsToMarket,
  productHasQuantity,
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

    const promisseProductsOk = productsInfo.map(async (
      { product, quantity } = {},
    ) => {
      try {
        const productBelowsToMarket = await belowsToMarket(product, marketId);
        const productHasEnoughQuantity = await productHasQuantity(
          product,
          quantity,
        );

        return productBelowsToMarket && productHasEnoughQuantity;
      } catch (exception) {
        return false;
      }
    });

    const isAllProductsOk = (await Promise.all(promisseProductsOk))
      .every(product => product === true);

    if (!isAllProductsOk) {
      throw new GeneralException(
        'Product dont bellows to market ordont have enough quantity',
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

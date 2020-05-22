function buildMarketHasProductsInTheCart({
  belowsToMarket,
  productHasQuantity,
}) {
  return async function marketHasProductsInTheCart(products = [], marketId) {
    const promisseProductsOk = products.map(async (
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

    return isAllProductsOk;
  };
}

module.exports = buildMarketHasProductsInTheCart;

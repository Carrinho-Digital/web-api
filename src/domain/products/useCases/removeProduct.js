const { remove, normalizeImageName } = require('../../../lib/storage');
const { Product } = require('../models/product');

function buildRemoveProduct() {
  return async function removeProduct(productId, marketId) {
    const product = await Product.findOne(
      {
        _id: productId,
        market: marketId,
      },
    );

    const images = product.images || [];
    const imageNames = images.map(normalizeImageName);

    const removeImagesPromise = imageNames.map(async image => {
      const imagePath = `${marketId}/products/${image}`;
      await remove(imagePath);
    });

    await Promise.all(removeImagesPromise);

    product.images = [];
    product.isDeleted = true;

    return product.save();
  };
}

module.exports = buildRemoveProduct;

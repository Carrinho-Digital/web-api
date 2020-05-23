const { updateProduct, getProduct } = require('../useCases');
const { normalizeImageName, remove } = require('../../../lib/storage');

async function removeProductImage(request, response) {
  const marketId = request.user._id;
  const productId = request.params.productId;

  const imageURL = request.body.imageUrl;

  if (!imageURL) {
    return response.status(400).json({
      success: false,
      errors: [
        'Image URL must be string',
      ],
    });
  }

  try {
    const imageName = normalizeImageName(imageURL);
    const imageFullPath = `${marketId}/products/${imageName}`;
    const imageRemoved = await remove(imageFullPath);

    if (!imageRemoved) {
      return response.status(422).json({
        success: false,
        errors: [
          'Cannot remove image the URL is not valid',
        ],
        message: 'CANNOT_REMOVE_PRODUCT_IMAGE',
      });
    }

    const product = await getProduct(
      productId,
      {
        query: { market: marketId },
        fields: 'images',
      },
    );

    const productImages = product.images || [];
    const updatedImages = productImages.filter(image => image !== imageURL);

    const productToUpdate = {
      images: updatedImages,
    };

    const updatedProduct = await updateProduct(
      productId,
      marketId,
      productToUpdate,
    );

    return response.status(200).json({
      success: true,
      message: 'PRODUCT_IMAGE_REMOVED',
      data: updatedProduct,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      errors: [
        exception.message,
      ],
      message: 'CANNOT_REMOVE_PRODUCT_IMAGE',
    });
  }
}

module.exports = removeProductImage;

const { upload } = require('../../../lib/storage');
const { manipule } = require('../../../lib/image-manipulator');

const {
  saveProduct,
  updateProduct,
} = require('../useCases');

async function saveProductImages(request, response) {
  const marketId = request.user._id;
  const productId = request.params.productId;

  try {
    const imagesURLPromise = request.files.map(async image => {
      const imageBuffer = await manipule(image.buffer);
      const imageURL = await upload(
        image.originalname,
        imageBuffer,
        `${marketId}/products`,
      );

      return imageURL;
    });

    const productImages = await Promise.all(imagesURLPromise);

    const product = {
      images: productImages,
    };

    const savedProduct = productId ?
      await updateProduct(productId, marketId, product) :
      await saveProduct(marketId, product);

    return response.status(201).json({
      success: true,
      message: 'PRODUCT_IMAGES_SAVED',
      data: savedProduct,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      message: 'CANNOT_SAVE_PRODUCT_IMAGE',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = saveProductImages;

const { getAllProducts } = require('../useCases');

async function getProducts(request, response) {
  const searchParams = {
    limit: parseInt(request.query.limit, 10) || 10,
    page: parseInt(request.query.page, 10) || 0,
  };

  try {
    const products = await getAllProducts(
      request.user,
      searchParams,
    );

    return response.status(200).json(products);
  } catch (exception) {
    return response.status(500).json({
      message: 'CANNOT_RETRIEVE_ALL_PRODUCTS',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = getProducts;

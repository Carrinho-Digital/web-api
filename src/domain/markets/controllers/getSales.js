const { getSearchParams } = require('../../../utils/paginate');
const {
  getSales: getSalesUseCase,
} = require('../../carts/useCases');

async function getSales(request, response) {
  const marketId = request.user._id;
  const searchParams = getSearchParams(request);

  try {
    const sales = await getSalesUseCase(
      marketId, searchParams);

    return response.status(200).json({
      success: true,
      ...sales,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      message: 'CANNOT_GET_SELLS',
      errors: [
        exception.message,
      ],
      success: false,
    });
  }
}

module.exports = getSales;

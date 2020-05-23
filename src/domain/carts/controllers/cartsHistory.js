const { getSearchParams } = require('../../../utils/paginate');
const {
  cartsHitory: cartsHistoryUseCase,
} = require('../useCases');


async function cartsHistory(request, response) {
  const userId = request.user._id;
  const searchParams = getSearchParams(request);

  try {
    const allCarts = await cartsHistoryUseCase(userId, searchParams);
    return response.status(200).json(allCarts);
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      errors: [
        exception.message,
      ],
      message: 'CANNOT_GET_CARTS_HISTORY',
    });
  }
}

module.exports = cartsHistory;

const {
  getSaleById: getSaleByIdUseCase,
} = require('../useCases');

async function getSaleById(request, response) {
  const marketId = request.user._id;
  const saleId = request.params.saleId;

  if (!saleId) {
    return response.status(400).json({
      message: 'CANNOT_GET_SALE_BY_ID',
      success: false,
      errors: [
        'Param saleId is required',
      ],
    });
  }

  try {
    const sale = await getSaleByIdUseCase(saleId, marketId);
    return response.status(200).json(sale);
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      message: 'CANNOT_GET_SALE_BY_ID',
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = getSaleById;

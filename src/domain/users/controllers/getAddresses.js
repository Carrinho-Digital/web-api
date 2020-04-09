const {
  getAddresses: getAddressesUseCase,
} = require('../useCases');

async function getAddresses(request, response) {
  const userId = request.user._id;

  try {
    const addresses = await getAddressesUseCase(userId);

    return response.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (exception) {
    return response.status(500).json({
      message: 'CANNOT_GET_ADDRESSES',
      success: false,
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = getAddresses;

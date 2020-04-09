const {
  removeUserAddress: removeUserAddressUseCase,
} = require('../useCases');

async function removeAddress(request, response) {
  const userId = request.user._id;
  const addressId = request.params.addressId;

  try {
    await removeUserAddressUseCase(addressId, userId);

    return response.status(200).json({
      success: true,
      message: 'ADDRESS_REMOVED',
    });
  } catch (exception) {
    return response.status(exception.status || 500)
      .json({
        success: false,
        errors: [
          exception.message,
        ],
        message: 'CANNOT_REMOVE_ADDRESS',
      });
  }
}

module.exports = removeAddress;

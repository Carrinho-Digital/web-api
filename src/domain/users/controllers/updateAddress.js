const saveAddressDto = require('../dto/saveAddressDto');

const {
  upsertUserAddress,
} = require('../useCases');

async function updateAddress(request, response) {
  const body = request.body;
  const userId = request.user._id;
  const addressId = request.params.addressId;

  const updateAddressBody = saveAddressDto.validate(body);

  if (updateAddressBody.error) {
    return response.status(400).json(updateAddressBody.error);
  }

  try {
    await upsertUserAddress(
      addressId,
      updateAddressBody.value,
      userId,
    );

    return response.status(200).json({
      success: true,
      message: 'ADDRESS_UPDATED',
    });
  } catch (exception) {
    return response.status(exception.status || 500)
      .json({
        errors: [
          exception.message,
        ],
        success: false,
        message: 'CANNOT_UPDATE_ADDRESS',
      });
  }
}

module.exports = updateAddress;

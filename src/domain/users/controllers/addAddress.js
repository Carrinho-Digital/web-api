const saveAddressDto = require('../dto/saveAddressDto');

const {
  upsertUserAddress,
} = require('../useCases');

async function addAddress(request, response) {
  const body = request.body;
  const userId = request.user._id;

  const saveAddressBody = saveAddressDto.validate(body);

  if (saveAddressBody.error) {
    return response.status(400).json(saveAddressBody.error);
  }

  try {
    await upsertUserAddress(
      null,
      saveAddressBody.value,
      userId,
    );

    return response.status(201).json({
      message: 'ADDRESS_ADDED',
      success: true,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      message: 'CANNOT_ADD_ADDRESS',
      success: false,
      errors: [
        exception.message,
      ],
    });
  }
}

module.exports = addAddress;

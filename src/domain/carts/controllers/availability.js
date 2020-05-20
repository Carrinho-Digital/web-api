const moment = require('moment');
const {
  availability: availabilityUseCase,
} = require('../useCases');

async function deliveryAvailbaility(request, response) {
  const userId = request.user._id;
  const marketId = request.params.marketId;
  const { from, to } = request.body;

  if (!from || !to) {
    return response.status(400).json({
      success: false,
      errors: [
        'Fields from and to are required',
      ],
      message: 'CANNOT_SAVE_AVAILABILITY_ON_CART',
    });
  }

  const parsedFromDate = moment(from).utc();
  const parsedToDate = moment(to).utc();

  if (!parsedFromDate.isValid() || !parsedToDate.isValid()) {
    return response.status(400).json({
      success: false,
      errors: [
        'Field from or to are not valid dates',
      ],
      message: 'CANNOT_SAVE_AVAILABILITY_ON_CART',
    });
  }

  if (parsedFromDate < moment.now()) {
    return response.status(400).json({
      success: false,
      errors: [
        'Field from cannot be less than today',
      ],
      message: 'CANNOT_SAVE_AVAILABILITY_ON_CART',
    });
  }

  if (parsedToDate < parsedFromDate) {
    return response.status(400).json({
      success: false,
      errors: [
        'Field to cannot be less than from',
      ],
      message: 'CANNOT_SAVE_AVAILABILITY_ON_CART',
    });
  }

  try {
    const updatedCart = await availabilityUseCase(
      marketId,
      userId,
      {
        to: parsedToDate,
        from: parsedFromDate,
      },
    );

    return response.status(200).json({
      success: true,
      message: 'DELIVERY_AVAILABILITY_SAVED',
      data: updatedCart,
    });
  } catch (exception) {
    return response.status(exception.status || 500).json({
      success: false,
      errors: [
        exception.message,
      ],
      message: 'CANNOT_SAVE_AVAILABILITY_ON_CART',
    });
  }
}

module.exports = deliveryAvailbaility;

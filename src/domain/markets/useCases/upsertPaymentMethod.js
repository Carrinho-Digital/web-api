const User = require('../../users/models/user');

const {
  NotFound: NotFoundException,
  General: GeneralException,
} = require('../../../exceptions');

function buildUpsertPaymentMethod({
  getUserById,
}) {
  return async function upsertPaymentMethod(
    paymentMethodId = null,
    marketId,
    payment,
  ) {
    if (!payment.method) {
      throw new GeneralException('Payment method is required', 400);
    }

    const isValidPaymentMethod = User.isValidPaymentMethod(payment.method);

    if (!isValidPaymentMethod) {
      throw new GeneralException('Payment method is not valid', 422);
    }

    const marketUser = await getUserById(marketId);
    const paymentMethods = [...marketUser.paymentMethods];

    if (!paymentMethodId) {
      const paymentMethodAlreadyExists = paymentMethods
        .some(paymentMethod => paymentMethod.method === payment.method);

      if (paymentMethodAlreadyExists) {
        throw new GeneralException('Payment method already exists', 422);
      }

      marketUser.paymentMethods.push(payment);

      await marketUser.save();
    } else {
      const paymentMethodAlreadyExists = paymentMethods
        .some(paymentMethod =>
          paymentMethod.method === payment.method &&
          paymentMethod._id.toString() !== paymentMethodId.toString());

      if (paymentMethodAlreadyExists) {
        throw new GeneralException('Payment method already exists', 422);
      }

      const updatedPaymentValue = await User.findOneAndUpdate(
        { '_id': marketId, 'paymentMethods._id': paymentMethodId },
        {
          '$set': {
            'paymentMethods.$.active': payment.active,
            'paymentMethods.$.method': payment.method,
            'paymentMethods.$._id': paymentMethodId,
          },
        },
      );

      if (!updatedPaymentValue) {
        throw new NotFoundException('Payment method not found');
      }
    }
  };
}

module.exports = buildUpsertPaymentMethod;

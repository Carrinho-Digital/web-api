const User = require('../../users/models/user');
const {
  NotFound: NotFoundException,
  General: GeneralException,
} = require('../../../exceptions');

function buildUpsertDeliveryRule() {
  return async function upsertDeliveryRule(
    ruleId = null,
    marketId,
    distanceInKm,
    price,
    defaultRule = false,
  ) {
    if (ruleId) {
      const updatedValue = await User.findOneAndUpdate(
        { '_id': marketId, 'deliveryRules._id': ruleId },
        {
          '$set': {
            'deliveryRules.$': {
              price,
              _id: ruleId,
              distanceInKm,
              defaultRule,
            },
          },
        },
      );

      if (!updatedValue) {
        throw new NotFoundException('Address could not be found', 404);
      }
    } else {
      const marketUser = await User.findOne({ _id: marketId });

      if (!marketUser) {
        throw new NotFoundException('Market could not be found');
      }

      const rules = marketUser.deliveryRules || [];
      const ruleAlredyExist = rules
        .some(rule => rule.distanceInKm === distanceInKm);

      if (ruleAlredyExist) {
        throw new GeneralException('Rule already exists', 422);
      }

      marketUser.deliveryRules.push({
        distanceInKm,
        price,
        defaultRule,
      });

      await marketUser.save();
    }
  };
}

module.exports = buildUpsertDeliveryRule;

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
    /**
     * Busco as informações do mercado
     */
    const marketUser = await User.findOne({ _id: marketId });

    if (!marketUser) {
      throw new NotFoundException('Market could not be found');
    }


    /**
     * Pego as regras que ele já possui
     */
    const rules = marketUser.deliveryRules || [];

    /**
     * Se já existir uma defaultRule eu não posso permitir que cadastre outra
     */
    if (defaultRule) {
      /**
       * Expression is an function to check by ruleId
       * or not if a default rule already exists
       * @param {Object} rule
       * @return {boolean} If some rule is defaultRule
       */
      const expression = ruleId ?
        rule => rule.defaultRule === true &&
          rule._id.toString() !== ruleId.toString() :
        rule => rule.defaultRule === true;

      const defaultRuleAlreadyExists = rules.some(expression);

      if (defaultRuleAlreadyExists) {
        throw new GeneralException('Only one default rule can exists', 422);
      }
    }


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

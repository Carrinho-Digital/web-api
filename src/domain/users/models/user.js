const mongoose = require('mongoose');

const authorizedTypes = [
  'MARKET_USER',
  'CUSTOMER_USER',
];

const availablePaymentsMethods = [
  'VISA_CREDITO',
  'VISA_DEBITO',
  'MASTERCARD_CREDITO',
  'MASTERCARD_DEBITO',
  'ELO_CREDITO',
  'ELO_DEBITO',
  'SODEXO_ALIMENTACAO',
  'SODEXO_REFEICAO',
  'CABAL_ALIMENTACAO',
  'CABAL_REFEICAO',
  'ALELO_ALIMENTACAO',
  'ALELO_REFEICAO',
  'DINHEIRO',
];

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  document: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  phones: [String],
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  type: String,
  online: {
    type: Boolean,
    default: false,
  },
  addresses: [
    {
      street: String,
      number: String,
      zipcode: String,
      buildType: String,
      reference: String,
      neighborhood: String,
    },
  ],
  favorites: [String],
  freeDelivery: {
    type: Boolean,
    default: true,
  },
  deliveryRules: [
    {
      distanceInKm: {
        type: Number,
      },
      price: {
        type: Number,
      },
      defaultRule: {
        type: Boolean,
        default: false,
      },
    },
  ],
  paymentMethods: [
    {
      method: {
        type: String,
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
  ],
}, {
  toJSON: {
    transform: function(document, ret) {
      delete ret.password;
    },
  },
});

userSchema.statics.isValidPaymentMethod = function(payment) {
  return availablePaymentsMethods.includes(payment);
};

userSchema.statics.isValidType = function(type) {
  return authorizedTypes.includes(type);
};

userSchema.methods.delete = function() {
  this.isDeleted = true;
};


module.exports = mongoose.model('User', userSchema);

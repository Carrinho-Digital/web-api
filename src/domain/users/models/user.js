const mongoose = require('mongoose');

const marketCategories = [
  {
    image: '',
    categoryId: 1,
    category: 'Mercado',
  },
  {
    image: '',
    categoryId: 2,
    category: 'Farmácia',
  },
  {
    image: '',
    categoryId: 3,
    category: 'Açougue',
  },
  {
    image: '',
    categoryId: 4,
    category: 'Água e Gás',
  },
  {
    image: '',
    categoryId: 5,
    category: 'Bebidas',
  },
  {
    image: '',
    categoryId: 6,
    category: 'Pet Shop',
  },
  {
    image: '',
    categoryId: 7,
    category: 'Variedades',
  },
];

const authorizedTypes = [
  'MARKET_USER',
  'CUSTOMER_USER',
];

const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
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
  birthDate: {
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
  category: {
    type: Number,
  },
  facebook: {
    type: {
      id: String,
      token: String,
    },
    select: false,
  },
  addresses: [
    {
      street: String,
      number: String,
      zipcode: String,
      buildType: String,
      reference: String,
      neighborhood: String,
      latitude: Number,
      longitude: Number,
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
  deliveryAvailabilities: [
    {
      dayOfWeek: {
        type: String,
      },
      availabilities: [
        {
          from: {
            type: Date,
          },
          to: {
            type: Date,
          },
        },
      ],
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

userSchema.statics.isValidDayOfWeek = function(dayOfWeek = '') {
  return daysOfWeek.includes(dayOfWeek.toLowerCase());
};

userSchema.statics.getCategories = function() {
  return [...marketCategories];
};

userSchema.statics.getMarketCategory = function(categoryId) {
  const marketCategory = marketCategories
    .find(marketCategory => marketCategory.categoryId === categoryId);

  return marketCategory;
};

userSchema.statics.isValidType = function(type) {
  return authorizedTypes.includes(type);
};

userSchema.methods.delete = function() {
  this.isDeleted = true;
};


module.exports = mongoose.model('User', userSchema);

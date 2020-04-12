const mongoose = require('mongoose');

const validUnits = [
  'kg',
  'g',
  'm',
  'mm',
  'cm',
  'm2',
  'm3',
  'un',
];

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: Date,
  updatedAt: Date,
  inactive: {
    type: Boolean,
    default: false,
  },
  description: String,
  color: String,
  size: String,
  unit: String,
  tags: [String],
  amount: {
    type: Number,
  },
  sku: String,
  sellPrice: Number,
  buyPrice: {
    type: Number,
    default: 0,
  },
  market: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  promotions: [
    {
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      discountInPercent: {
        type: Number,
      },
      discountInPrice: {
        type: Number,
      },
    },
  ],
},
{
  timestamps: true,
});

productSchema.statics.isValidUnit = function(unit = '') {
  return validUnits.includes(unit.toLowerCase());
};

productSchema.statics.findAllMarketProducts = function(
  marketId, query, searchParams) {
  return this.find(
    {
      ...query,
      market: marketId,
    },
    null,
    searchParams,
  );
};

module.exports.Product = mongoose.model('Product', productSchema);

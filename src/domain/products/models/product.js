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
  images: [String],
  buyPrice: {
    type: Number,
    default: 0,
  },
  market: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
{
  timestamps: true,
});

productSchema.statics.isValidUnit = function(unit = '') {
  return validUnits.includes(unit.toLowerCase());
};

module.exports.Product = mongoose.model('Product', productSchema);

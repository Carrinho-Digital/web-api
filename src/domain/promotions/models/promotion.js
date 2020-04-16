const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  market: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  tags: [String],
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  undefinedTime: {
    type: Boolean,
  },
  discountInPercent: {
    type: Number,
    default: 0,
  },
  discountInPrice: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports.Promotion = mongoose.model('Promotion', promotionSchema);

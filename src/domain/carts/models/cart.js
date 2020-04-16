// TODO: colocar o campo virtual para calcular o preço total
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  market: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  closed: {
    type: Boolean,
    default: false,
  },
  createdAt: Date,
  updatedAt: Date,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
});

module.exports.Cart = mongoose.model('Cart', cartSchema);

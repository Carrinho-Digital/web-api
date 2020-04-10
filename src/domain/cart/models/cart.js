const mongoose = require('mongoose');
const { Product } = require('../../products/models/product');

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
  delivery: {
    method: {
      type: String,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
}, {
  toJSON: { virtuals: true },
});

cartSchema.methods.total = async function() {
  if (!Array.isArray(this.products)) {
    return 0;
  }

  if (this.products.length < 1) {
    return 0;
  }

  const promisseProducts = this.products.map(async (
    { product: productId, quantity } = {},
  ) => {
    const product = await Product.findOne({ _id: productId });

    return {
      product,
      quantity,
    };
  });

  const products = await Promise.all(promisseProducts);

  const totalCart = products.reduce((prev, {product, quantity}) =>
    prev + ( product.sellPrice * quantity ), 0);

  return {
    cart: totalCart,
    delivery: 0,
  };
};

module.exports.Cart = mongoose.model('Cart', cartSchema);

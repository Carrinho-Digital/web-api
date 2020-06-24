const mongoose = require('mongoose');
const {
  General: GeneralException,
} = require('../../../exceptions');

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
    price: Number,
  },
  availability: {
    from: Date,
    to: Date,
  },
  wasAccepted: {
    type: Boolean,
    default: false,
  },
  wasRejected: {
    type: Boolean,
    default: false,
  },
  payment: {
    method: {
      type: String,
    },
    exchange: Number,
    document: String,
  },
  total: Number,
}, {
  toJSON: { virtuals: true },
});

cartSchema.methods.hasDeletedOrInexistentProducts = async function() {
  if (!Array.isArray(this.products)) {
    return [];
  }

  if (this.products.length < 1) {
    return [];
  }

  const cartProductsPromise = this.products.map(async ({ product }) => {
    return await Product.findOne({ _id: product });
  });

  const cartProducts = await Promise.all(cartProductsPromise);

  const deletedOrInexistent = cartProducts.filter(product => {
    return !product || (product && product.isDeleted);
  });

  return deletedOrInexistent;
};

cartSchema.methods.totalPriceOfProducts = async function() {
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

    if (!product || (product && product.isDeleted)) {
      return null;
    }

    return {
      product,
      quantity,
    };
  });

  const products = await Promise.all(promisseProducts);

  const hasNullProducts = products.some(product => !product);

  if (hasNullProducts) {
    throw new GeneralException('Some products dont exists anymore', 422);
  }

  const allProductsPrice = products.reduce((prev, {product, quantity}) =>
    prev + ( product.sellPrice * quantity ), 0);

  return allProductsPrice;
};

cartSchema.methods.isClosed = function() {
  return this.closed === true;
};

cartSchema.methods.hasDelivery = function() {
  if (!this.delivery) return false;

  const { method, address } = this.delivery;

  if (!method || !address) return false;

  if (method === 'pickup') return true;

  if (method === 'delivery' && !address) return false;

  return true;
};

cartSchema.methods.hasProducts = function() {
  if (!this.products) return false;
  return this.products.length > 0 &&
    this.products.map(product => product.quantity > 0);
};

cartSchema.methods.hasAvailability = function() {
  const { from, to } = this.availability;

  if (!from || !to) return false;
  return true;
};

cartSchema.methods.closeCart = async function() {
  if (this.isClosed()) {
    throw new Error('Cart is already closed');
  }

  this.total = await this.totalPriceOfProducts();

  this.closed = true;
  this.updatedAt = Date.now();
};

cartSchema.methods.setDeliveryPrice = function(deliveryPrice) {
  if ((deliveryPrice === null || deliveryPrice === undefined) &&
      this.delivery.method === 'delivery') {
    throw new Error('Delivery price cannot be null or undefined');
  }

  this.delivery.price = deliveryPrice;
};

module.exports.Cart = mongoose.model('Cart', cartSchema);

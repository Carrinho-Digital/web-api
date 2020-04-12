const mongoose = require('mongoose');

const authorizedTypes = [
  'MARKET_USER',
  'CUSTOMER_USER',
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
}, {
  toJSON: {
    transform: function(document, ret) {
      delete ret.password;
    },
  },
});

userSchema.statics.isValidType = function(type) {
  return authorizedTypes.includes(type);
};

userSchema.methods.delete = function() {
  this.isDeleted = true;
};


module.exports = mongoose.model('User', userSchema);

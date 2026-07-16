const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true,
  },
  type: {
    type: String,
    enum: ['buy', 'sell'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'filled', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

orderSchema.index({ userId: 1, status: 1 });
orderSchema.index({ symbol: 1, status: 1 });

module.exports = mongoose.model('Order', orderSchema);

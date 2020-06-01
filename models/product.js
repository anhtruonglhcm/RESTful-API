const mongoose = require('mongoose');

const { Schema } = mongoose;
const ProductSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
  name: String,
  photo: String,
  price: Number,
  description: String,
  stockQuantity: Number,
  rate: [Number],
});

module.exports = mongoose.model('Product', ProductSchema);

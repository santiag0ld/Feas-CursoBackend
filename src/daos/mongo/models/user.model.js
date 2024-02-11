const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  role: { type: String, default: 'user' },
});

userSchema.pre('find', function () {
  this.populate('cart');
});

userSchema.plugin(mongoosePaginate)

const User = mongoose.model('User', userSchema);

module.exports = User;

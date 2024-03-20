import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
  role: { type: String, enum: ['user', 'admin','premium'], default: 'user' },
});

userSchema.pre('find', function () {
  this.populate('cart');
});

userSchema.plugin(mongoosePaginate)

const User = model('User', userSchema);

export default User;

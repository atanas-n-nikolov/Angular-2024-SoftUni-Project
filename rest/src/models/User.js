import { Schema, Types, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants.js'

const userSchema = new Schema({
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: [true, 'First name is required!']
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: [true, 'Last name is required!']
  },
  email: {
    type: String,
    minLength: 10,
    unique: true,
    required: [true, 'Email is required!']
  },
  password: {
    type: String,
    minLength: 4,
    required: [true, 'Password is required!']
  },
  created: [{
    type: Types.ObjectId,
    ref: 'Animal'
  }],
  liked: [{
    type: Types.ObjectId,
    ref: 'Animal'
  }]
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

const User = model('User', userSchema);
export default User;
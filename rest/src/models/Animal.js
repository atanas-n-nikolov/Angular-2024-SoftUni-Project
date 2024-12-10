import { Schema, Types, model } from 'mongoose';
import validator from 'validator';

const animalSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    enum: ['Dog', 'Cat', 'Other'],
    required: [true, 'Type of animal is required!']
  },
  age: {
    type: String,
    enum: ['Young', 'Adult', 'Senior'],
    required: [true, 'Age of animal is required!']
  },
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    required: [true, 'Size of animal is required!']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'Gender of animal is required!']
  },
  specialNeeds: {
    type: String,
    enum: ['Yes', 'No'],
    required: [true, 'Special needs of animal is required!']
  },
  location: {
    type: String,
    required: [true, 'Location of animal is required!']
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minLength: 5,
    reqiured: true,
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  },
  likes: [{
    type: Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['Adopt', 'Lost', 'Found'],
    default: 'Adopt',
    required: [true, 'Status of animal is required!']
  },
},
  {timestamps: true},
);

const Animal = model('Animal', animalSchema);

export default Animal;
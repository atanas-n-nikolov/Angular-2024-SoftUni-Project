import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from '../lib/jwt.js';
import { JWT_SECRET } from '../constants.js'

export const register = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if(user) {
    throw new Error('This email address is already used.');
  };  

  const newUser = await User.create(userData);
  const result = generateToken(newUser);  
  return result;
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if(!user) {
    throw new Error('Invalid email or password!');
  };

  const isValid = await bcrypt.compare(password, user.password);

  if(!isValid) {
    throw new Error('Invalid email or password!');
  };

  const result = await generateToken(user);

  return result;
};

export const edit = async (userId, userData) => {
  const user = await User.findByIdAndUpdate(userId, userData, {runValidators: true});
  const payload = {
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
  };

  const token = await jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});
  return {user, token};
};

export const getInfo = async (userId) => {
  const user = await User.findById({ _id: userId }, { password: 0, __v: 0 }).populate('created').populate('liked');
  return user;
}

async function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
  };

  const token = await jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});
  const result = {
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    accessToken: token,
  };
  return result;
};
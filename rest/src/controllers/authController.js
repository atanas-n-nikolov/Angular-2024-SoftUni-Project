import { Router } from "express";
import { login, register, getInfo, edit } from "../services/authService.js";
import { AUTH_COOKIE_NAME } from '../constants.js'
import { getErrorMsg } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import jwt from "../lib/jwt.js";

const authController = Router();

authController.post('/register', async (req, res) => {
  try {
    const user = await register(req.body);
    res.cookie(AUTH_COOKIE_NAME, user.accessToken, {httpOnly: true, sameSite: 'none', secure: true});
    res.status(200).json(user);
  } catch (err) {
    const error = getErrorMsg(err);
    console.error('Error during registration:', err);
    res.status(400).json({ message: 'Registration failed. ' + error });
  }
});

  authController.post('/login', async (req, res) => {
    const userData = req.body;
    
    try {
      const user = await login(userData);
      res.cookie(AUTH_COOKIE_NAME, user.accessToken, {httpOnly: true, sameSite: 'none', secure: true});
      res.status(200).json(user);
    } catch (err) {
      const error = getErrorMsg(err);
      console.error('Error during login:', err);
      res.status(401).json({ message: 'Login failed. ' + error });
    };
  });

authController.get('/profile', isAuth, async (req, res) => {
  const id = req.user?._id;

  try {
    if (!id) {
      return res.status(400).json({ message: 'User ID not found in request' });
    };

    let user = await getInfo(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    };

    res.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'An error occurred while fetching user profile. Please try again later.' });
  };
})

authController.put('/profile', isAuth, async (req, res) => {
  const id = req.user?._id;
  const { firstName, lastName, email } = req.body

  try {
    const {user, token: accessToken} = await edit(id, {firstName, lastName, email});
    res.cookie(AUTH_COOKIE_NAME, accessToken, {httpOnly: true, sameSite: 'none', secure: true});
    res.status(200).json(user);
  } catch (err) {
    const error = getErrorMsg(err);
    console.error('Error updating profile:', err);
    res.status(400).json({ message: 'Profile update failed. ' + error });
  }
})

authController.post('/logout', (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.end();
});

export default authController;
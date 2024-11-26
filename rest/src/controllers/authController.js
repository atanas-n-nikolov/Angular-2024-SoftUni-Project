import { Router } from "express";
import { login, register } from "../services/authService.js";
import dotenv from 'dotenv';
// import getErrorMsg from '../utils/errorUtils.js';

const authController = Router();

authController.post('/register', async (req, res) => {
  try {
    const result = await register(req.body);
    res.cookie(process.env.AUTH_COOKIE_NAME, result.accessToken, {httpOnly: true, sameSite: 'none'});
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: 'err'})
  }
});

authController.post('/login', async (req, res) => {
  const userData = req.body;
  
  try {
    const result = await login(userData);
    res.cookie(process.env.AUTH_COOKIE_NAME, result.accessToken, {httpOnly: true, sameSite: 'none'});
    res.json(result);
  } catch (err) {
    res.status(401).json({message: 'err'});
  };
});

authController.post('/logout', (req, res) => {
  res.clearCookie(process.env.AUTH_COOKIE_NAME);
  res.end();
});

export default authController;
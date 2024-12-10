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
    res.status(401).json(error)
  }
});

  authController.post('/login', async (req, res) => {
    const userData = req.body;
    
    try {
      const user = await login(userData);
      res.cookie(AUTH_COOKIE_NAME, user.accessToken, {httpOnly: true, sameSite: 'none', secure: true});
      res.json(user);
    } catch (err) {
      const error = getErrorMsg(err);
      res.status(401).json(error)
    };
  });

authController.get('/profile', isAuth, async (req, res) => {
  const id = req.user?._id;

  try {
    let user = await getInfo(id);
    
    res.json(user);
  } catch (err) {
    res.status(401).json({message: 'no token'})
  }
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
    res.status(401).json(error)
  }
})

authController.post('/logout', (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.end();
});

export default authController;
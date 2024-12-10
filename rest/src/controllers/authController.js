import { Router } from "express";
import { login, register, getInfo, edit } from "../services/authService.js";
import { AUTH_COOKIE_NAME, JWT_SECRET } from '../constants.js'
import { getErrorMsg } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import jwt from "../lib/jwt.js";

const authController = Router();

authController.post('/register', async (req, res) => {
  try {
    const user = await register(req.body);
    const token = await jwt.sign({
      _id: user._id, email: user.email, firstName: user.firstName
    }, JWT_SECRET, { expiresIn: '2h'})
    res.cookie(AUTH_COOKIE_NAME, token, {httpOnly: true, sameSite: 'none', secure: true});
    console.log(user)
    res.status(200).json(user);
  } catch (err) {
    const error = getErrorMsg(err);
    res.status(401).json(error)
  }
});

  authController.post('/login', async (req, res) => {
    const userData = req.body;
    
    try {
      const user = await login(req.body);
      const token = await jwt.sign({
        _id: user._id, email: user.email, firstName: user.firstName
      }, JWT_SECRET, { expiresIn: '2h'})
      res.cookie(AUTH_COOKIE_NAME, token, {httpOnly: true, sameSite: 'none', secure: true});
      const { password, ...userWithoutPassword } = user.toObject ? user.toObject() : user;
      res.json(userWithoutPassword);
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

  try {
    const updatedUser = await edit(id, req.body);
    const token = await jwt.sign(
      { _id: updatedUser._id, email: updatedUser.email, firstName: updatedUser.firstName },
      JWT_SECRET,
      { expiresIn: '2h' }
    );
    
    res.cookie(AUTH_COOKIE_NAME, token, {httpOnly: true, sameSite: 'none', secure: true});
    res.status(200).json(updatedUser);
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
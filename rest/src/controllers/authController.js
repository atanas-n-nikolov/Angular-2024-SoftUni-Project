import { Router } from "express";
import { login, register, getInfo, edit } from "../services/authService.js";
import { AUTH_COOKIE_NAME } from '../constants.js'
import { getErrorMsg } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.post('/register', async (req, res) => {
  try {
    const result = await register(req.body);
    res.cookie(AUTH_COOKIE_NAME, result.accessToken, {httpOnly: true, sameSite: 'none', secure: true});
    res.status(200).json(result);
  } catch (err) {
    const error = getErrorMsg(err);
    res.status(401).json(error)
  }
});

authController.post('/login', async (req, res) => {
  const userData = req.body;
  
  try {
    const result = await login(userData);
    res.cookie(AUTH_COOKIE_NAME, result.accessToken, {httpOnly: true, sameSite: 'none', secure: true});
    res.json(result);
  } catch (err) {
    const error = getErrorMsg(err);
    res.status(401).json(error)
  };
});

authController.get('/profile', isAuth, async (req, res) => {
  const id = req.user?._id;

  try {
    let user = await getInfo(id);
    console.log(user);
    
    res.json(user);
  } catch (err) {
    res.status(400).json({message: 'err'})
  }
})

authController.put('/profile', isAuth, async (req, res) => {
  const id = req.user?._id;
  const userData = req.body;

  try {
    const {user, token: accessToken} = await edit(id, userData);
    
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

authController.get('/profile/likes', isAuth, async (req, res) => {
  const id = req.user?._id;
  let user = await getInfo(id);

  const likes = user.liked;
  res.json(likes)
});

export default authController;
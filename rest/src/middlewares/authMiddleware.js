import jwt from '../lib/jwt.js';
import { JWT_SECRET, AUTH_COOKIE_NAME } from '../constants.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  if(!token) {
    return next();
  };

  try {
    const decodedToken = await jwt.verify(token, JWT_SECRET);

    req.user = decodedToken;
    req.isAuthenticated = true;
    // res.locals.user = decodedToken;
    // res.locals.isAuthenticated = true;
    next();
  } catch (error) {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/auth/login');
  };
};

export const isAuth = async (req, res, next) => {
  if(!req.user) {
    return res.redirect('/');
  };

  next();
};

export const isGuest = async (req, res, next) => {
  if(req.user) {
    return res.redirect('/');
  };

  next();
};
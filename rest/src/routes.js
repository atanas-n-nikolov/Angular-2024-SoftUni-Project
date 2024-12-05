import { Router } from 'express';
import authController from './controllers/authController.js';
import animalController from './controllers/animalController.js';

const routes = Router();
routes.use('/users', authController);
routes.use('/animals', animalController);

export default routes;
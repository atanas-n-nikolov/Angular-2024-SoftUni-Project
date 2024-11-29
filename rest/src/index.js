import express from 'express'
import routes from './routes.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();
app.use(cors({
  origin: 'http://localhost:4200', credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(authMiddleware);
app.use(routes);

try {
  mongoose.connect('mongodb://localhost:27017', { dbName: 'Shelter'});
  console.log('DB Connected!')
} catch (error) {
  console.log('Cannot connect to DB!');
};

app.listen(3000, () => console.log('Server is listening on http://localhost:3000 ...'));
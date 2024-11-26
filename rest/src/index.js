import express from 'express'
import routes from './routes.js';
import { corsMiddleware } from './middlewares/cors.js';
import mongoose from 'mongoose';

const app = express();
app.use(corsMiddleware);
app.use(express.json());

app.use(routes);

try {
  mongoose.connect('mongodb://localhost:27017', { dbName: 'Shelter'});
  console.log('DB Connected!')
} catch (error) {
  console.log('Cannot connect to DB!');
};

app.listen(3000, () => console.log('Server is listening on http://localhost:3000 ...'));
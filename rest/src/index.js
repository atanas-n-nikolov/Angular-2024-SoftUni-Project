import express from "express";
import routes from "./routes.js";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import path from 'path';
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/authMiddleware.js";



const app = express();
const corsOptions = {
  origin: "https://animal-adoption-client.onrender.com",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(authMiddleware);
app.use(routes);

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    await mongoose.connect(uri, { dbName: "Shelter"});
    console.log("DB Connected!");
  } catch (error) {
    console.log("Cannot connect to DB!", error.message);
    process.exit(1);
  }
})();

app.use(express.static(path.join(__dirname, 'dist/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/client/browser', 'index.html'));
});

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT} ...`));

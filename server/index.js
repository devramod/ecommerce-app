import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import routes from "./routes/routes.js";
import admin from "./routes/admin.js";
import user from "./routes/user.js";

// Configuration
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const PORT = process.env.PORT || 8080;

// Routes
app.use('/', routes);
app.use('/admin', admin);
app.use('/user', user);

// Mongoose
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to database"))
  .catch((err) => console.log(err.message));


app.listen(PORT, () => console.log("server is running"));

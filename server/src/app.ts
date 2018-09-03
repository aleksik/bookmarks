import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import expressValidator from "express-validator";
import { query, validationResult } from "express-validator/check";
import { MONGODB_URI, PORT } from "./util/secrets";
import logger from "./util/logger";

// Controllers
import apiController from "./controllers/api";

// Express server
const app = express();

// MongoDB
mongoose.Promise = bluebird;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(() => {
  logger.info("Connected to MongoDB");
}).catch((err) => {
  logger.error(err);
});

// Express config
app.set("port", PORT);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// API routes
app.use("/api", apiController);

export default app;
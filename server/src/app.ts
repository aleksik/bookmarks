import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import expressValidator from "express-validator";
import cors from "cors";
import { MONGODB_URI, PORT, ENVIRONMENT, SCREENSHOTS_PATH } from "./util/secrets";
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

// Enable cors on dev
if (ENVIRONMENT !== "production") {
  app.use(cors());
}

// Serve static screenshots
app.use("/screenshots", express.static(SCREENSHOTS_PATH));

// API routes
app.use("/api", apiController);

export default app;
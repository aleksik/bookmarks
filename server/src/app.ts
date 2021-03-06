import express from "express";
import passport from "passport";
import compression from "compression";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import expressValidator from "express-validator";
import cors from "cors";
import { MONGODB_URI, PORT, ENVIRONMENT, SCREENSHOTS_PATH, UI_PATH } from "./util/constants";
import logger from "./util/logger";
import auth from "./util/auth";

// Controllers
import authController from "./controllers/auth";
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

// Auth
passport.use(auth);

// Other express configs
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

// Serve assets
app.use("/", express.static(UI_PATH));

// Routes
app.use("/api", apiController);
app.use("/api/auth", authController);

export default app;
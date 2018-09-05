import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import logger from "./logger";

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env"});
} else {
  dotenv.config({ path: ".env.example"});
}

export const PORT = process.env.PORT || 3000;

export const ENVIRONMENT = process.env.NODE_ENV;

export const MONGODB_URI = process.env.MONGODB_URI;

export const SCREENSHOTS_PATH = path.join(__dirname, "../../screenshots");

export const UI_PATH = path.join(__dirname, "../../../client/dist");

export const SESSION_SECRET = process.env.SESSION_SECRET;

export const USERNAME = process.env.USERNAME;

export const PASSWORD = process.env.PASSWORD;

if (!MONGODB_URI) {
  logger.error("Missing MONGODB_URI environment variable.");
  process.exit(1);
}
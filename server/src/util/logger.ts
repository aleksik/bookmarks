import winston from "winston";
import { ENVIRONMENT } from "./constants";

const logger = winston.createLogger({
  level: ENVIRONMENT !== "production" ? "debug" : "error",
  transports: ENVIRONMENT !== "production" ? [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ] : [
    new winston.transports.File({
      filename: "error.log",
      level: "error"
    })
  ],
});

export default logger;
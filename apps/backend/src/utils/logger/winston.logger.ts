import winston from "winston";
import getEnv from "../getEnv";

const isDev = getEnv("node_env") === "development";

// Define your severity levels.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors({
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  debug: "white",
});

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss:ms" }),
  // Tell Winston that the logs must be colored
  winston.format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
  ),
);

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports: winston.transport[] = [
  // Allow the use the console to print the messages
  new winston.transports.Console(),
];

if (isDev) {
  transports.push(
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
    new winston.transports.File({ filename: "logs/http.log", level: "http" }),
  );
}

const winstonLogger = winston.createLogger({
  level: isDev ? "debug" : "warn",
  levels,
  format,
  transports,
});

if (isDev) {
  winstonLogger.exceptions.handle(
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  );
  winstonLogger.rejections.handle(
    new winston.transports.File({ filename: "logs/rejections.log" }),
  );
}

export default winstonLogger;

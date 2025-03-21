import morgan from "morgan";
import getEnv from "../getEnv";
import winstonLogger from "./winston.logger";

const morganLogger = morgan(
  ":remote-addr :method :url :status - :response-time ms",
  {
    stream: {
      write: (message: string) => winstonLogger.http(message.trim()),
    },
    skip: () => getEnv("node_env") !== "development",
  },
);

export default morganLogger;

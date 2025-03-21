import expressServer from "./expressServer";
import getEnv from "./utils/getEnv";
import logger from "./utils/logger/winston.logger";

(async () => {
  try {
    const app = expressServer();

    const port = getEnv("port");

    app.listen(port, () => {
      console.log(`Server is running on port:${port}`);
    });
  } catch (err) {
    logger.error(err);
  }
})();

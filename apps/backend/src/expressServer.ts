import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import passport from "passport";
import requestIp from "request-ip";
import apiRouter from "./apis/api.routes";
import ApiError from "./helpers/apiError.helper";
import { apiJsonResponse } from "./helpers/apiResponse.helper";
import errorHandler from "./middlewares/error.middleware";
import getEnv from "./utils/getEnv";
import morganLogger from "./utils/logger/morgan.logger";

export default function expressServer(): express.Express {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: getEnv("frontend_uri"),
      methods: ["GET", "POST", "PATCH", "DELETE"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
  );
  app.use(requestIp.mw());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      keyGenerator: (req, _res) => {
        return req.clientIp as string; // IP address from requestIp.mw(), as opposed to req.ip
      },
      handler: (_, __, ___, options) => {
        throw new ApiError(
          options.statusCode || 500,
          `There are too many requests. You are only allowed ${
            options.max
          } requests per ${options.windowMs / 60000} minutes`,
        );
      },
    }),
  );
  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));
  app.use(cookieParser());
  app.use(morganLogger);
  app.use(passport.initialize());

  app.get("/", (_req, res) => {
    const response = apiJsonResponse(res);

    return response(200, "Server is running", null);
  });

  app.use("/api", apiRouter);

  app.use(errorHandler);

  return app;
}

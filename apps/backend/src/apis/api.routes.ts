import { Router } from "express";
import apiController from "../helpers/apiController.helper";
import { apiJsonResponse } from "../helpers/apiResponse.helper";

const apiRouter = Router();

apiRouter.get(
  "/",
  apiController((_req, res) => {
    const response = apiJsonResponse(res);

    return response(200, "API Server is running", null);
  }),
);

export default apiRouter;

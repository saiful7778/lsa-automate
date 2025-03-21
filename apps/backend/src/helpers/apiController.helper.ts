import type { NextFunction, Request, Response } from "express";

export default function apiController(
  controllerFunc: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void> | void,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFunc(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

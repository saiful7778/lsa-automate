import type { NextFunction, Request, Response } from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import apiController from "../helpers/apiController.helper";
import ApiError from "../helpers/apiError.helper";
import getEnv from "../utils/getEnv";
import logger from "../utils/logger/winston.logger";

/**
 * Custom interface to extend the native Error object with additional properties.
 */
interface CustomError extends Error {
  statusCode?: number;
  errors?: unknown[];
}

/**
 * Handles errors and sends a consistent error response.
 * @param {CustomError | ApiError} err - The error object.
 * @param {Request} _req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} _next - Express next function.
 * @returns {void} - JSON response with error details.
 *
 * @description This middleware is responsible to catch the errors from any request handler wrapped inside the {@link apiController}
 */
export default function errorHandler(
  err: CustomError | ApiError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  // eslint-disable-next-line prefer-const
  let error = err;

  // Prepare the error response
  const response = {
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    ...(getEnv("node_env") === "development" ? { stack: error.stack } : {}), // Include stack trace in development
  };

  // Log the error
  logger.error(`${error.message}`);

  // Send the error response
  res.status(error.statusCode ?? 500).json(response);
  return;
}

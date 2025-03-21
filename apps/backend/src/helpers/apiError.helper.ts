// eslint-disable-next-line @typescript-eslint/no-unused-vars
import errorHandler from "../middlewares/error.middleware";

/**
 * @description Common Error class to throw an error from anywhere.
 * The {@link errorHandler} middleware will catch this error at the central place and it will return an appropriate response to the client.
 */
export default class ApiError extends Error {
  public readonly statusCode: number;
  public readonly data: null;
  public readonly success: boolean;
  public readonly errors: unknown[];

  /**
   * @param {number} statusCode - HTTP status code for the error.
   * @param {string} message - Error message.
   * @param {unknown[]} errors - Array of errors (optional).
   * @param {string} stack - Error stack trace (optional).
   */
  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: unknown[] = [],
    stack: string = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

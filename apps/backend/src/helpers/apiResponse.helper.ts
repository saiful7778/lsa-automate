import type { Response } from "express";

export function apiJsonResponse(res: Response) {
  return function <T>(statusCode: number, message: string, data: T) {
    res.status(statusCode).json({
      success: statusCode < 400,
      statusCode: statusCode,
      data: data,
      message: message,
    });
  };
}

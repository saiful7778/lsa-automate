import "express";

// Extend the Express Request interface
declare global {
  namespace Express {
    interface User {
      id?: string | undefined;
      fullname?: string | undefined;
      email?: string | undefined;
      refreshToken?: string | undefined;
    }

    interface Request {
      user?: User | undefined;
    }
  }
}

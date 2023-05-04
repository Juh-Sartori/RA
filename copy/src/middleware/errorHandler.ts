import { NextFunction, Request, Response } from "express";

export type ErrorType = {
  message: string;
  status: number;
  stack?: string; //eh a tragetoria do error
};

export const errorHandler = (
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status ? error.status : 500;
  //   let status;
  //   if (error.status) {
  //     status = error.status;
  //   } else {
  //     status = 500;
  //   }
  const errorResponse = {
    message: error.message ? error.message : "Internal server error",
    stack: error.stack,
  };

  res.status(status).json(errorResponse);
};

export const makeError = ({ message, status }: ErrorType) => {
  return { message, status };
};

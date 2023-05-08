import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import authRepositories from "../repository/AuthRepositories";
import { makeError } from "./errorHandler";

export const tokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const userToken = token?.split(" ")[1]!;
    const tokenVerify: any = jwt.verify(userToken, process.env.SECRET_TOKEN!);
    const userFromDatabase = await authRepositories.getUser({
      id: tokenVerify.userId,
    });
    if (!userFromDatabase) {
      throw makeError({ message: "usuario não existe", status: 500 });
    }
    next();
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Response } from "express";
import { UnauthorizedError } from "../@types/errors/UnauthorizedError";
import { RequestUsuer } from "../@types/middlewares/requestUser";
import { checkToken } from "../helpers/Token";

export const authMiddleware = (request: RequestUsuer, response: Response, next: NextFunction) => {
  const authorization = request.headers.authorization;
  console.log('authorization', authorization);
  
  if (!authorization) {
    throw new UnauthorizedError();
  }

  try {
    const user = checkToken(authorization);
    request.user = user
  } catch (error) {
    throw new UnauthorizedError();
  }

  next();
}


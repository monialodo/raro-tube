import { NextFunction, Response } from "express";
import { UnauthorizedError } from "../@types/errors/UnauthorizedError";
import { RequestUser } from "../@types/middlewares/requestUser";


export const allUserAuthMiddleware = (request: RequestUser, response: Response, next: NextFunction) => {

  const authorization = request.headers.authorization;
  if (!authorization) {
    throw new UnauthorizedError();
  }
  const token = authorization.split(" ")[1];
  console.log('token', token);

  const parseJwt = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  console.log('parseJwt', parseJwt.role);

  if (!parseJwt.role) {
    throw new UnauthorizedError();
  } else {
    next();
  }
}


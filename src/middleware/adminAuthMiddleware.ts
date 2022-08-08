import { NextFunction, Response } from "express";
import { UnauthorizedError } from "../@types/errors/UnauthorizedError";
import { Role } from "../@types/helpers/EnumRoles";
import { RequestUser } from "../@types/middlewares/requestUser";


export const adminAuthMiddleware = (request: RequestUser, response: Response, next: NextFunction) => {
  const authorization = request.headers.authorization;
  if (!authorization) {
    throw new UnauthorizedError();
  }
  const enumRoles = Role;

  if (request.user.role === enumRoles.ROOT) {
    next();
  }

  const token = authorization.split(" ")[1];

  const parseJwt = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const userRole = (parseJwt(token).role).toLowerCase();

  userRole === enumRoles.ADMIN ? next() : next(new UnauthorizedError());

}


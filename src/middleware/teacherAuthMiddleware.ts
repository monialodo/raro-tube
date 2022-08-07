import { NextFunction, Response } from "express";
import { UnauthorizedError } from "../@types/errors/UnauthorizedError";
import { Role } from "../@types/helpers/EnumRoles";
import { RequestUser } from "../@types/middlewares/requestUser";


export const teacherAuthMiddleware = (request: RequestUser, response: Response, next: NextFunction) => {
    const authorization = request.headers.authorization;
    if (!authorization) {
        throw new UnauthorizedError();
    }
    const enumRoles = Role;

    const token = authorization.split(" ")[1];
    const parseJwt = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());


    const userRole = (parseJwt(token).role).toLowerCase();

    userRole === enumRoles.TEACHER || enumRoles.ROOT ? next() : next(new UnauthorizedError());

}


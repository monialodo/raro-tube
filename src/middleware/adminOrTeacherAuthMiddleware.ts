import { NextFunction, Response } from "express";
import { UnauthorizedError } from "../@types/errors/UnauthorizedError";
import { Role } from "../@types/helpers/EnumRoles";
import { RequestUser } from "../@types/middlewares/requestUser";


export const adminOrTeacherAuthMiddleware = (request: RequestUser, response: Response, next: NextFunction) => {    
    const authorization = request.headers.authorization;
    if (!authorization) {
        throw new UnauthorizedError();
    }
    const enumRoles = Role;

    const token = authorization.split(" ")[1];
    const parseJwt = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    
    if ((parseJwt.role === enumRoles.ADMIN) || (parseJwt.role === enumRoles.TEACHER)) {
        return next();
    } else {
        throw new UnauthorizedError()
    }
    

}


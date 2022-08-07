import * as express from 'express';
import { BadRequestError } from "../@types/errors/BadRequestError";
import { BaseError } from "../@types/errors/BaseError";
import { ForbiddenError } from "../@types/errors/ForbiddenError";
import { InternalServerError } from "../@types/errors/InternalServerErrorError";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { UnauthorizedError } from "../@types/errors/UnauthorizedError";
import { UnprocessableEntityError } from "../@types/errors/UnprocessableEntityError";

const handledHttpStatusErrors = [
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  UnprocessableEntityError
]

const isErrorHandled = (error: BaseError): boolean => {
  return handledHttpStatusErrors.some(e => error instanceof e);
}

export const errorHandler = (app: express.Express) => {
  app.use((err: BaseError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (isErrorHandled(err)) {
      res.status(err.httpStatus).json({ err });
    }
    res.status(500).json({ err: err.message });
  })
}

export const errorMiddleware = (handler: express.RequestHandler) => {
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      Promise.resolve(handler(req, res, next)).catch(next);
    } catch (error) {
      next(error);
    }
  }

}
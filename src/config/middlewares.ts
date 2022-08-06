import { json } from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as morgan from "morgan";


const createMiddlewares = (app: express.Express) => {
  app.use(cors());
  app.use(json({ limit: '5mb' }));
  app.use(morgan('dev'));


};
 
export default createMiddlewares;


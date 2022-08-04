import * as express from "express";
import createRouters from "../routes";
import createMiddlewares from "./middlewares";

const createApp = (): express.Express => {
  const app = express();
  createMiddlewares(app);
  createRouters(app);

  return app;
};

export default createApp;
 
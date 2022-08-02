import * as express from "express";

import createUserRouter from "./userRouter";

const createRouters = (app: express.Express) => {
  app.use("/v1/users", createUserRouter);
};

export default createRouters;

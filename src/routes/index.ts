import * as express from "express";

import createStudentRouter from "./studentRouter";
import createSuperUserRouter from "./superUserRouter";

const createRouters = (app: express.Express) => {
  app.use("/v1/students", createStudentRouter());
  app.use("/v1/super-users", createSuperUserRouter());
};

export default createRouters;

import * as express from "express";
import createStudentRouter from "./studentRouter";
import createAdministratorRouter from "./AdministratorRouter";
const createRouters = (app: express.Express) => {
  app.use("/v1/students", createStudentRouter());
  app.use('/v1/administrators', createAdministratorRouter())
};

export default createRouters;

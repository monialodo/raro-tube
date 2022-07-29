import * as express from "express";
import createStudentRouter from "./studentRouter";

const createRouters = (app: express.Express) => {
  app.use("/v1/students", createStudentRouter());
};

export default createRouters;

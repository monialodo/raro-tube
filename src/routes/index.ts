import * as express from "express";
import createStudentRouter from "./studentRouter";
import createTeacherRouter from "./teacherRouter";

const createRouters = (app: express.Express) => {
  app.use("/v1/students", createStudentRouter());
  app.use("/v1/teachers", createTeacherRouter());
};

export default createRouters;

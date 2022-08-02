import * as express from "express";

import createAdministratorRouter from "./administratorRouter";
import createStudentRouter from "./studentRouter";
import createSuperUserRouter from "./superUserRouter";
import createTeacherRouter from "./teacherRouter";
import createCommentRouter from "./commentRouter";

const createRouters = (app: express.Express) => {
  app.use("/v1/students", createStudentRouter());
  app.use("/v1/super-users", createSuperUserRouter());
  app.use("/v1/teachers", createTeacherRouter());
  app.use("/v1/administrators", createAdministratorRouter());
  app.use("v1/comments", createCommentRouter)
};

export default createRouters;

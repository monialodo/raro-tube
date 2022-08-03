import * as express from "express";

import createCommentRouter from "./commentRouter";
import createUserRouter from "./userRouter";

const createRouters = (app: express.Express) => {
  app.use("/v1/classrooms", createCommentRouter());
  app.use("/v1/users", createUserRouter());
  app.use("v1/comments", createCommentRouter());
};

export default createRouters;

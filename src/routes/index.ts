import * as express from "express";

import createCommentRouter from "./commentRouter";
import createTagRouter from "./tagRouter";
import createUserRouter from "./userRouter";

const createRouters = (app: express.Express) => {
  app.use("/v1/classrooms", createCommentRouter());
  app.use("/v1/users", createUserRouter());
  app.use("v1/comments", createCommentRouter());

  app.use("/v1/tags", createTagRouter());
};

export default createRouters;

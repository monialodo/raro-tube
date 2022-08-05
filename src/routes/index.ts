import * as express from "express";
import createFavoritesRouter from "./favoritesRouter";

import createClassroomRouter from "./classroomRouter";
import createCommentRouter from "./commentRouter";
import createFileRouter from "./fileRouter";
import createTagRouter from "./tagRouter";
import createUserRouter from "./userRouter";
import createVideoRouter from "./videoRouter";

const createRouters = (app: express.Express) => {
  app.use("/v1/classrooms", createClassroomRouter());
  app.use("/v1/users", createUserRouter());
  app.use("/v1/comments", createCommentRouter());
  app.use("/v1/tags", createTagRouter());
  app.use("/v1/videos", createVideoRouter())
  app.use("/v1/files", createFileRouter());
  app.use("/v1/favorites", createFavoritesRouter())
};

export default createRouters;

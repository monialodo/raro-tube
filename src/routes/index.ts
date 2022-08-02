import * as express from "express";


import createCommentRouter from "./commentRouter";

const createRouters = (app: express.Express) => {
  app.use("v1/comments", createCommentRouter)
};

export default createRouters;

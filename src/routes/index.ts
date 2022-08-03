import * as express from "express";


import createVideoRouter from "./videoRouter";

const createRouters = (app: express.Express) => {

  app.use("/v1/videos", createVideoRouter())
};

export default createRouters;

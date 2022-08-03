import * as express from "express";

import createFileRouter from "./fileRouter";


const createRouters = (app: express.Express) => {

  app.use("/v1/files", createFileRouter());
};

export default createRouters;

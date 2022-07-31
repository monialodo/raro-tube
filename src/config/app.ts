import * as express from "express";

import createRouters from "../routes";

const createApp = (): express.Express => {
  const app = express();

  createRouters(app);

  return app;
};

export default createApp;

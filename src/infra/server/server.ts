import * as express from "express";

const createServer = (app: express.Express) => {
  app.listen(3000, () => {
    console.log(`Application running on port 3000`);
  });
};

export default createServer;

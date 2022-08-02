import * as express from "express";

const createRouters = (app: express.Express) => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
};

export default createRouters;

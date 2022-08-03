import * as express from "express";
import createFavoritesRouter from "./favoritesRouter";

const createRouters = (app: express.Express) => {
    app.use("/v1/favorites", createFavoritesRouter())
};

export default createRouters;

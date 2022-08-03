import { Router } from "express";
import { Container } from "typedi";
import { FavoritesController } from "../controllers/FavoritesController";

const router = Router();


const getController = (): FavoritesController => {
    return Container.get<FavoritesController>("FavoritesController");
};

const createFavoritesRouter = () => {
    router.get("/", (req, res) => getController().findAll(req, res));
    router.get("/:id", (req, res) => getController().find(req, res));
    router.post("/", (req, res) => getController().create(req, res));
    return router;
};

export default createFavoritesRouter
  
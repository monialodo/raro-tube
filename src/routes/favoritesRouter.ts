import { Router } from "express";
import { Container } from "typedi";
import { FavoritesController } from "../controllers/FavoritesController";
import { errorMiddleware } from "../middleware/errorHandler";

const router = Router();


const getController = (): FavoritesController => {
    return Container.get<FavoritesController>("FavoritesController");
};

const createFavoritesRouter = () => {
    router.get("", errorMiddleware((req, res) => getController().findAll(req, res)));
    router.post("", errorMiddleware((req, res) => getController().create(req, res)));
    router.get("/:id", errorMiddleware((req, res) => getController().find(req, res)));
    router.post("/:userId/:videoId", errorMiddleware((req, res) => getController().favAndUnfav(req, res)));
    router.put("/:id", errorMiddleware((req, res) => getController().update(req, res)));
    router.delete("/:id", errorMiddleware((req, res) => getController().delete(req, res)));

    return router;
};

export default createFavoritesRouter;
  
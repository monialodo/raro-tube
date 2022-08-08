import { Router } from "express";
import { Container } from "typedi";
import { FavoritesController } from "../controllers/FavoritesController";
import { adminOrTeacherAuthMiddleware } from "../middleware/adminOrTeacherAuthMiddleware";
import { allUserAuthMiddleware } from "../middleware/allUserAuthMiddleware";
import { errorMiddleware } from "../middleware/errorHandler";   

const router = Router();


const getController = (): FavoritesController => {
    return Container.get<FavoritesController>("FavoritesController");
};

const createFavoritesRouter = () => {
    router.get("/", allUserAuthMiddleware, errorMiddleware((req, res) => getController().findAll(req, res)));
    router.post("/", allUserAuthMiddleware, errorMiddleware((req, res) => getController().create(req, res)));
    router.get("/:id", allUserAuthMiddleware, errorMiddleware((req, res) => getController().find(req, res)));
    router.post("/:userId/:videoId", allUserAuthMiddleware, errorMiddleware((req, res) => getController().favAndUnfav(req, res)));
    router.put("/:id", allUserAuthMiddleware, errorMiddleware((req, res) => getController().update(req, res)));
    router.delete("/:id", adminOrTeacherAuthMiddleware, errorMiddleware((req, res) => getController().delete(req, res)));

    return router;
};

export default createFavoritesRouter;
  
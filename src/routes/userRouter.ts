import { Router } from "express";
import { Container } from "typedi";

import { UserController } from "../controllers/UserController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";


const router = Router();

const getController = (): UserController => {
  return Container.get<UserController>("UserController");
};

const createUserRouter = () => {
  router.get("/", (req, res) => getController().findAll(req, res));
  router.get("/:id", ensureAuthenticated, (req, res) => getController().find(req, res));
  router.post("/", (req, res) => getController().create(req, res));
  router.put("/:id", (req, res) => getController().update(req, res));
  router.delete("/:id", (req, res) => getController().delete(req, res));

  return router;
};

export default createUserRouter;

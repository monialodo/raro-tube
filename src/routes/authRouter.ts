import { Router } from "express";
import Container from "typedi";
import { AuthController } from "../controllers/AuthController";

const router = Router();

const getController = (): AuthController => {
  return Container.get<AuthController>("AuthController");
}

const createRouter = () => {
  router.post("/signup", (req, res) => getController().signup(req, res));
  router.post("/login", (req, res) => getController().login(req, res));
  router.post("/forgot", (req, res) => getController().forgot(req, res));
  router.post("/code", (req, res) => getController().code(req, res));

  return router;
}

export default createRouter;
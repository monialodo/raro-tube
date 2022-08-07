import { Router } from "express";
import Container from "typedi";
import { AuthenticationController } from "../controllers/AuthenticationController";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";


const router = Router();

const getController = (): AuthenticationController => {
  return Container.get<AuthenticationController>("AuthenticationController");
}

const createRouter = () => {
  router.post("/signup", errorHandler, (req, res) => getController().signup(req, res));
  router.post("/login", errorHandler, (req, res) => getController().login(req, res));
  router.post("/forgot", errorHandler, (req, res) => getController().forgot(req, res));
  router.post("/reset", errorHandler, (req, res) => getController().resetPassword(req, res));
  return router;
}

export default createRouter;
import { Router } from "express";
import Container from "typedi";
import { AuthenticationController } from "../controllers/AuthenticationController";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import { errorMiddleware } from "../middleware/errorHandler";


const router = Router();

const getController = (): AuthenticationController => {
  return Container.get<AuthenticationController>("AuthenticationController");
}

const createRouter = () => {
  router.post("/signup", errorHandler, errorMiddleware((req, res) => getController().signup(req, res)));
  router.post("/login", errorHandler, errorMiddleware((req, res) => getController().login(req, res)));
  router.post("/forgot", errorHandler, errorMiddleware((req, res) => getController().forgot(req, res)));
  router.post("/reset", errorHandler, errorMiddleware((req, res) => getController().resetPassword(req, res)));
  return router;
}

export default createRouter;
import { Router } from "express";
import Container from "typedi";
import { AuthenticationController } from "../controllers/AuthenticationController";
import { allUserAuthMiddleware } from "../middleware/allUserAuthMiddleware";
import { errorMiddleware } from "../middleware/errorHandler";


const router = Router();

const getController = (): AuthenticationController => {
  return Container.get<AuthenticationController>("AuthenticationController");
}

const createRouter = () => {
  router.post("/signup", errorMiddleware((req, res) => getController().signup(req, res)));
  router.post("/login", allUserAuthMiddleware, errorMiddleware((req, res) => getController().login(req, res)));
  router.post("/forgot", errorMiddleware((req, res) => getController().forgot(req, res)));
  router.post("/reset", allUserAuthMiddleware, errorMiddleware((req, res) => getController().resetPassword(req, res)));
  return router;
}

export default createRouter;
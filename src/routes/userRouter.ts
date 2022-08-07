import { Router } from "express";
import { Container } from "typedi";

import { UserController } from "../controllers/UserController";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import { teacherAuthMiddleware } from "../middleware/teacherAuthMiddleware";
import { errorHandler } from "../middleware/errorHandler";


const router = Router();

const getController = (): UserController => {
  return Container.get<UserController>("UserController");  
};
 
const createUserRouter = () => {
  router.get("/", errorHandler, adminAuthMiddleware, teacherAuthMiddleware, (req, res) => getController().findAll(req, res));
  router.get("/:id", errorHandler,  (req, res) => getController().find(req, res));
  router.post("/", errorHandler, adminAuthMiddleware,  (req, res) => getController().create(req, res));
  router.put("/:id",errorHandler, (req, res) => getController().update(req, res));
  router.delete("/:id", errorHandler, (req, res) => getController().delete(req, res));

  return router;
}; 

export default createUserRouter;

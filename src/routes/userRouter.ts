import { Router } from "express";
import { Container } from "typedi";

import { UserController } from "../controllers/UserController";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import { teacherAuthMiddleware } from "../middleware/teacherAuthMiddleware";
import {  errorMiddleware } from "../middleware/errorHandler";
import * as express from "express";

const router = Router();

const getController = (): UserController => {
  return Container.get<UserController>("UserController");  
};
const createUserRouter = () => {
  router.get("/", adminAuthMiddleware, teacherAuthMiddleware, errorMiddleware((req, res) => getController().findAll(req, res)));
  router.get("/:id", errorMiddleware((req,  res) => getController().find(req, res)));
  router.post("/", adminAuthMiddleware, errorMiddleware((req, res) => getController().create(req, res)));
  router.put("/:id", errorMiddleware((req, res) => getController().update(req, res)));
  router.delete("/:id", errorMiddleware((req, res) => getController().delete(req, res)));
 
  return router;
}; 

export default createUserRouter;

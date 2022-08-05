import { Router } from "express";
import Container from "typedi";
import { AuthenticationController } from "../controllers/AuthenticationController";
import { authorizeMiddleware } from "../middleware/authorizeMiddleware";


const router = Router();

const getController = (): AuthenticationController => {
  return Container.get<AuthenticationController>("AuthenticationController");
} 
 
const createRouter = () => {
  router.post("/signup", (req, res) => getController().signup(req, res));
  router.post("/login", (req, res) => getController().login(req, res));
  router.post("/forgot", (req, res) => getController().forgot(req, res));
  router.post("/code", (req, res) => getController().code(req, res));
  router.post("", (req, res) => getController().create(req, res));
  router.post("/authenticate", (req, res) => getController().authenticate(req, res));
  return router;
}
  
export default createRouter;
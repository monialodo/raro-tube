import { Router } from "express";
import Container from "typedi";
import { AuthenticationController } from "../controllers/AuthenticationController";
import { authorizeMiddleware } from "../middleware/authorizeMiddleware";


const router = Router();

const getController = (): AuthenticationController => {
  return Container.get<AuthenticationController>("AuthenticationController");
} 
 
const createRouter = () => {
  router.post("", (req, res) => getController().create(req, res));
  router.post("/authenticate", (req, res) => getController().authenticate(req, res));
  return router;
}
 
export default createRouter;
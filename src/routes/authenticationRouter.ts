// import { Router } from "express";
// import Container from "typedi";
// import { AuthenticationController } from "../controllers/AuthenticationController";


// const router = Router();

// const getController = (): AuthenticationController => {
//   return Container.get<AuthenticationController>("AuthenticationController");
// }

// const createAuthenticationRouter = () => {
//   const controller = getController();
//   router.post("/", (req, res) => controller.create(req, res));
//   router.post("/authenticate", (req, res) => controller.authenticate(req, res));
//   return router;
// }

// export default createAuthenticationRouter;
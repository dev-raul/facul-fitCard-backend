import { Router } from "express";
//middleware
import authMiddlware from "./app/middlewares/auth";
import checkPermissionMiddleware from "./app/middlewares/checkPermission";

//controllers
import UserController from "./app/controllers/UserController";
import StudantController from "./app/controllers/StudantController";
import SessionController from "./app/controllers/SessionController";
import TrainingController from "./app/controllers/TrainingController";

//validators
import { UserStore, UserUpdate } from "./app/validators/User";
import { StudantStore, StudantUpdate } from "./app/validators/Studant";
import { SessionStore } from "./app/validators/Session";
import { TrainingStore, TrainingUpdate } from "./app/validators/Training";

const routes = Router();

routes.post("/session", SessionStore, SessionController.store);

routes.post("/user", UserStore, UserController.store);

routes.use(authMiddlware);

//Check if the actor is provider
routes.use(checkPermissionMiddleware);

routes.get("/user", UserController.index);
routes.get("/user/:id", UserController.show);
routes.put("/user/:id", UserUpdate, UserController.update);
routes.delete("/user/:id", UserController.destroy);

routes.get("/user/:user_id/studant", StudantController.index);
routes.post("/user/:user_id/studant", StudantStore, StudantController.store);
routes.put(
  "/user/:user_id/studant/:id",
  StudantUpdate,
  StudantController.update
);
routes.delete("/user/:user_id/studant/:id", StudantController.destroy);

routes.get("/user/:user_id/training", TrainingController.index);
routes.post("/user/:user_id/training", TrainingStore, TrainingController.store);
routes.put(
  "/user/:user_id/training/:id",
  TrainingUpdate,
  TrainingController.update
);
routes.delete("/user/:user_id/training/:id", TrainingController.destroy);

export default routes;

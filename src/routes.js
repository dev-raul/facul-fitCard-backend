import { Router } from "express";

//controllers
import UserController from "./app/controllers/UserController";
import StudantController from "./app/controllers/StudantController";
import SessionController from "./app/controllers/SessionController";

//validators
import { UserStore, UserUpdate } from "./app/validators/User";
import { StudantStore, StudantUpdate } from "./app/validators/Studant";
import { SessionStore } from "./app/validators/Session";

const routes = Router();

routes.post("/session", SessionStore, SessionController.store);

routes.get("/user", UserController.index);
routes.post("/user", UserStore, UserController.store);

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

export default routes;

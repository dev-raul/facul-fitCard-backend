import { Router } from "express";

//controllers
import UserController from "./app/controllers/UserController";

//validators
import { UserStore, UserUpdate } from "./app/validators/User";

const routes = Router();

routes.get("/user", UserController.index);
routes.post("/user", UserStore, UserController.store);

routes.get("/user/:id", UserController.show);
routes.put("/user/:id", UserUpdate, UserController.update);
routes.delete("/user/:id", UserController.destroy);

export default routes;

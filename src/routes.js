import { Router } from "express";
const routes = Router();
routes.get("/", (req, res) => {
  return res.send("Initial");
});
export default routes;

import "dotenv/config";
import express from "express";
import cors from "cors";

import "./database";
import routes from "./routes";
class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }
  middleware() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

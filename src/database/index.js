import Sequelize from "sequelize";

import databaseConfig from "../config/database";

//Colocar todos os models
import User from "../app/models/User";
import Studant from "../app/models/Studant";
import Training from "../app/models/Training";
const models = [User, Studant, Training];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();

import Sequelize from "sequelize";

import databaseConfig from "../config/database";

//Colocar todos os models
import User from "../app/models/User";
import Studant from "../app/models/Studant";
import Training from "../app/models/Training";
import ItemTraining from "../app/models/ItemTraining";
import StudantTraining from "../app/models/StudantTraining";

const models = [User, Studant, Training, ItemTraining, StudantTraining];

class Database {
  constructor() {
    this.init();
  }

  async init() {
    if (process.env.NODE_DEV) {
      this.connection = new Sequelize(databaseConfig);
    } else {
      const { url, ...rest } = databaseConfig;
      this.connection = new Sequelize(url, {
        ...rest,
      });
    }

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();

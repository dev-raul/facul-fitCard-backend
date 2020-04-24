import Sequelize, { Model } from "sequelize";
import jwt from "jsonwebtoken";

class Studant extends Model {
  static init(sequelize) {
    super.init(
      {
        id_hash: Sequelize.STRING,
        name: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
  generateToken() {
    return jwt.sign({ id: this.id, provider: false }, process.env.APP_SECRET);
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
  }
}

export default Studant;

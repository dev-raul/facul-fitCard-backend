import Sequelize, { Model } from "sequelize";

class Training extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      { sequelize, tableName: "trainings" }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
    this.hasMany(models.ItemTraining, {
      foreignKey: "training_id",
      as: "item_trainings",
    });
  }
}

export default Training;

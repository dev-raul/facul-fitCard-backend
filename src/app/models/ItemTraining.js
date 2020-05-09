import Sequelize, { Model } from "sequelize";

class ItemTraining extends Model {
  static init(sequelize) {
    super.init(
      {
        instrument: Sequelize.STRING,
        number: Sequelize.INTEGER,
        series: Sequelize.INTEGER,
        repeat: Sequelize.INTEGER,
        load: Sequelize.INTEGER,
        observation: Sequelize.TEXT
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Training, {
      foreignKey: "training_id",
      as: "trainings"
    });
  }
}

export default ItemTraining;

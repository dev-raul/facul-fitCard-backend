import Sequelize, { Model } from "sequelize";

class StudantTraining extends Model {
  static init(sequelize) {
    super.init(
      {
        schedule: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }
}

export default StudantTraining;

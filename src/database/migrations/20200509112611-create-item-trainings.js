"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */
    return queryInterface.createTable("item_trainings", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      training_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "trainings",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      instrument: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      series: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      repeat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      load: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      observation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */
    return queryInterface.dropTable("item_trainings");
  },
};

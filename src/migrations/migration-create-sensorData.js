"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SensorData", {
      //     temperature: DataTypes.STRING,
      //   pH: DataTypes.STRING,
      //   acidity: DataTypes.STRING,
      //   chlorine: DataTypes.STRING,
      //   oxygen: DataTypes.STRING,
      //   sensorId: DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      temperature: {
        type: Sequelize.STRING,
      },
      pH: {
        type: Sequelize.STRING,
      },
      acidity: {
        type: Sequelize.STRING,
      },
      chlorine: {
        type: Sequelize.STRING,
      },
      oxygen: {
        type: Sequelize.STRING,
      },
      sensorId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("SensorData");
  },
};

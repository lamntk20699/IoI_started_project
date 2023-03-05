"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Devices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Devices.init(
    {
      keyCode: DataTypes.STRING,
      name: DataTypes.STRING,
      statusId: DataTypes.STRING,
      userId: DataTypes.STRING,
      tokenAuth: DataTypes.STRING,
      tokenCollectData: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Devices",
    }
  );
  return Devices;
};

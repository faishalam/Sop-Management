"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BusinessProcess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BusinessProcess.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      BusinessProcess.hasMany(models.Category, {
        foreignKey: "businessProcessId",
      });
    }
  }
  BusinessProcess.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User ID is required",
          },
          notEmpty: {
            msg: "User ID is required",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "BusinessProcess",
    }
  );
  return BusinessProcess;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      Category.belongsTo(models.BusinessProcess, {
        foreignKey: "businessProcessId",
        onDelete: "CASCADE",
      });
      Category.hasMany(models.SubCategory, {
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(
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
      businessProcessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Business Process ID is required",
          },
          notEmpty: {
            msg: "Business Process ID is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};

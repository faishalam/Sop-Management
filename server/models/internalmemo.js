"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InternalMemo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InternalMemo.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  InternalMemo.init(
    {
      userId: {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
          notNull : {
            msg : "User ID is required"
          },
          notEmpty : {
            msg : "User ID is required"
          }
        }
      },
      title: {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
          notNull : {
            msg : "Title is required"
          },
          notEmpty : {
            msg : "Title is required"
          }
        }
      },
      document: {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
          notNull : {
            msg : "Document is required"
          },
          notEmpty : {
            msg : "Document is required"
          }
        }
      },
    },
    {
      sequelize,
      modelName: "InternalMemo",
    }
  );
  return InternalMemo;
};

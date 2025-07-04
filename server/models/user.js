"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.InternalMemo, { foreignKey: "userId" });
      User.hasMany(models.BusinessProcess, { foreignKey: "userId" });
      User.hasMany(models.Category, { foreignKey: "userId" });
      User.hasMany(models.SopLibrary, { foreignKey: "userId" });
      User.hasMany(models.Revision, { foreignKey: "revisedBy" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "User Name is required",
          },
          notEmpty: {
            msg: "User Name is required",
          },
        },
      },
      nrp: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "NRP is required",
          },
          notEmpty: {
            msg: "NRP is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
        },
      },
      role: {
        type: DataTypes.ENUM(
          "admin",
          "superior_1",
          "superior_2",
          "MR Mutu",
          "MR K3KOLH",
          "user"
        ),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Role is required",
          },
          notEmpty: {
            msg: "Role is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: { msg: "Email format is invalid" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

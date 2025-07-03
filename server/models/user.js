"use strict";
const { Model } = require("sequelize");
const { genSalt } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Category, { foreignKey: "userId" });
      User.hasMany(models.SopLibrary, { foreignKey: "userId" });
      User.hasMany(models.InternalMemo, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username is required",
          },
          notEmpty: {
            msg: "Username is required",
          },
        },
      },
      nrp: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
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
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance, option) {
          instance.password = genSalt(instance.password);
        },
        beforeUpdate(instance, option) {
          if (instance.changed("password")) {
            instance.password = genSalt(instance.password);
          }
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

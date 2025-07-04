"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Revision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Revision.belongsTo(models.SopLibrary, {
        foreignKey: "sopLibraryId",
        onDelete: "CASCADE",
      });
      Revision.belongsTo(models.User, {
        foreignKey: "revisedBy",
      });
    }
  }
  Revision.init(
    {
      sopLibraryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "SOP Library ID is required",
          },
          notEmpty: {
            msg: "SOP Library ID is required",
          },
        },
      },
      revisedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Revised By is required",
          },
          notEmpty: {
            msg: "Revised By is required",
          },
        },
      },
      reasonRevise: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Reason Revised is required",
          },
          notEmpty: {
            msg: "Reason Revised is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Revision",
    }
  );
  return Revision;
};

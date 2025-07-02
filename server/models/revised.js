"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class revised extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      revised.belongsTo(models.SopLibrary, { foreignKey: "sopLibraryId" });
    }
  }
  revised.init(
    {
      sopLibraryId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "SOP Library ID is required",
          },
          allowNull: {
            msg: "SOP Library ID is required",
          },
        },
      },
      revisedBy: {
        type: DataTypes.STRING,
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
            msg: "Reason Revise is required",
          },
          notEmpty: {
            msg: "Reason Revise is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "revised",
    }
  );
  return revised;
};

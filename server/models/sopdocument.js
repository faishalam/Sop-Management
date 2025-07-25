"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SopDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SopDocument.belongsTo(models.SopLibrary, {
        foreignKey: "sopLibraryId",
        onDelete: "CASCADE",
      });
    }
  }
  SopDocument.init(
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
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Url is required",
          },
          notEmpty: {
            msg: "Url is required",
          },
        },
      },
      cloudinaryId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Cloudinary ID is required",
          },
          notEmpty: {
            msg: "Cloudinary ID is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "SopDocument",
    }
  );
  return SopDocument;
};

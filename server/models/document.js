"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Document.belongsTo(models.SopLibrary, { foreignKey: "sopLibraryId" });
    }
  }
  Document.init(
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
            msg: "URL is required",
          },
          notEmpty: {
            msg: "URL is required",
          },
        },
      },
      cloudinaryId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Cloudinary IDis required",
          },
          notEmpty: {
            msg: "Cloudinary IDis required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Document",
    }
  );
  return Document;
};

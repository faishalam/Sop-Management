"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InternalMemoDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here\
      InternalMemoDocument.belongsTo(models.InternalMemo, {
        foreignKey: "internalMemoId",
        onDelete: "CASCADE",
      });
    }
  }
  InternalMemoDocument.init(
    {
      internalMemoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Internal Memo ID is required",
          },
          notEmpty: {
            msg: "Internal Memo ID is required",
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
      modelName: "InternalMemoDocument",
    }
  );
  return InternalMemoDocument;
};

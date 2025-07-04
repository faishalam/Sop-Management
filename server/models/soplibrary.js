"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SopLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SopLibrary.belongsTo(models.User, {
        foreignKey: "superior_1",
        as: "Superior1",
      });
      SopLibrary.belongsTo(models.User, {
        foreignKey: "superior_2",
        as: "Superior2",
      });
      SopLibrary.belongsTo(models.User, {
        foreignKey: "md",
        as: "MdApprover",
      });
      SopLibrary.hasMany(models.SopDocument, {
        foreignKey: "sopLibraryId",
      });
      SopLibrary.hasMany(models.Revision, {
        foreignKey: "sopLibraryId",
      });
    }
  }
  SopLibrary.init(
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
      subCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Sub Category ID is required",
          },
          notEmpty: {
            msg: "Sub Category ID is required",
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      effective_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Effective Date is required",
          },
          notEmpty: {
            msg: "Effective Date is required",
          },
        },
      },
      superior_1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Superior 1 is required",
          },
          notEmpty: {
            msg: "Superior 1 is required",
          },
        },
      },
      superior_2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "superior 2 is required",
          },
          notEmpty: {
            msg: "superior 2 is required",
          },
        },
      },
      md: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "MD is required",
          },
          notEmpty: {
            msg: "MD is required",
          },
        },
      },
      status: {
        type: DataTypes.ENUM(
          "submitted",
          "Approved by Superior 1",
          "Approved by MR Mutu",
          "Approved by MR K3KOLH",
          "Approved by Superior 2",
          "Revised"
        ),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Status is required",
          },
          notEmpty: {
            msg: "Status is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "SopLibrary",
    }
  );
  return SopLibrary;
};

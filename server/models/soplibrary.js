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
      SopLibrary.belongsTo(models.User, { foreignKey: "userId" });
      SopLibrary.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  SopLibrary.init(
    {
      userId: {
        type: DataTypes.STRING,
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
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category ID is required",
          },
          notEmpty: {
            msg: "Category ID is required",
          },
        },
      },
      business_process: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Business process is required",
          },
          notEmpty: {
            msg: "Business process is required",
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
      document: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Document is required",
          },
          notEmpty: {
            msg: "Document is required",
          },
        },
      },
      superior_1: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "submitted",
        validate: {
          notNull: {
            msg: "Status is required",
          },
          notEmpty: {
            msg: "Status is required",
          },
        },
      },
      reasonRevise: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "SopLibrary",
    }
  );
  return SopLibrary;
};

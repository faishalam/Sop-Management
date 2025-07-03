'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocumentInternalMemo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DocumentInternalMemo.belongsTo(models.InternalMemo, { foreignKey: "internalMemoId" });
    }
  }
  DocumentInternalMemo.init({
    internalMemoId: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notNull: {
          msg : "Internal Memo ID is required"
        },
        notEmpty : {
          msg : "Internal Memo ID is required"
        }
      }
    },
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          msg : "Name is required"
        },
        notEmpty : {
          msg : "Name is required"
        }
      }
    },
    url: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          msg : "URL is required"
        },
        notEmpty : {
          msg : "URL is required"
        }
      }
    },
    cloudinaryId: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          msg : "Cloudinary ID is required"
        },
        notEmpty : {
          msg : "Cloudinary ID is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'DocumentInternalMemo',
  });
  return DocumentInternalMemo;
};
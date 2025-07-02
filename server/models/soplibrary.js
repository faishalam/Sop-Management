'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SopLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SopLibrary.init({
    userId: DataTypes.STRING,
    categoryId: DataTypes.STRING,
    business_process: DataTypes.STRING,
    title: DataTypes.STRING,
    effective_date: DataTypes.DATE,
    document: DataTypes.STRING,
    superior_1: DataTypes.STRING,
    superior_2: DataTypes.STRING,
    md: DataTypes.STRING,
    status: DataTypes.STRING,
    reasonRevise: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SopLibrary',
  });
  return SopLibrary;
};
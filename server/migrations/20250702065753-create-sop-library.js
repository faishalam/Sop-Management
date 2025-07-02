"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SopLibraries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.STRING,
      },
      business_process: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      effective_date: {
        type: Sequelize.DATE,
      },
      document: {
        type: Sequelize.STRING,
      },
      superior_1: {
        type: Sequelize.STRING,
      },
      superior_2: {
        type: Sequelize.STRING,
      },
      md: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "submitted",
      },
      reasonRevise: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SopLibraries");
  },
};

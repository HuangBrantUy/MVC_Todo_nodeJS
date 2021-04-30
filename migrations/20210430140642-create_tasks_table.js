'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.createTable("tasks", {
      id:{
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      code: {
        type: Sequelize.STRING,
        allowNull: false
      },

      taskName: {
        type: Sequelize.STRING,
        allowNull:false
      },

      description: {
        type: Sequelize.STRING,
        allowNull:false
      },

      dueDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull:false
      },

      updatedAt: {
        type: Sequelize.DATE
      },

      deletedAt: {
        type: Sequelize.DATE
      }

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tasks");
  }
};

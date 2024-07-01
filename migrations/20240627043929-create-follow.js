'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Follows', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'CASCADE',
      },
      follower_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'CASCADE',
      },
   
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Follows');
  },
};

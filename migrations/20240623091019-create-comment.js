'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Comments', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'Users', // Имя связанной таблицы
                  key: 'id',     // Имя связанного столбца
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
              
            },
            postId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Posts', // Имя таблицы в базе данных
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Comments');
    }
};

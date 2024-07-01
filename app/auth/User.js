const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); // Путь к вашему файлу db.js

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},
{
  timestamps: false, // Используем правильное имя опции для отключения автоматических timestamp'ов
});

module.exports = User;

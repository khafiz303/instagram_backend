const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const TemporaryUser = sequelize.define('TemporaryUser', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  valid_till: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Установим текущее время как значение по умолчанию
  },
}, {
  timestamps: false,
});

module.exports = TemporaryUser;

// models/Post.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/User');

const Story = sequelize.define('Story', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    timestamps: true
});

// Устанавливаем связь между Post и User
Story.belongsTo(User, {
    foreignKey: 'userId',
    as : 'user'
});
User.hasMany(Story, {
    foreignKey: 'userId',
    as : 'story'
});

module.exports = Story;

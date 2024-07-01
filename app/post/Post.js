// models/Post.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/User');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
Post.belongsTo(User, {
    foreignKey: 'userId'
});
User.hasMany(Post, {
    foreignKey: 'userId',
    as:'posts'
});


module.exports = Post;

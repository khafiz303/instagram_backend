const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/User');
const Post = require('./Post');

const Like = sequelize.define('Like', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

Like.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Like, { foreignKey: 'postId', as: 'likes' });

Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Like, { foreignKey: 'userId', as: 'likes' });

module.exports = Like;

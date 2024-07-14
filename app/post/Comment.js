// models/Comment.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/User');
const Post = require('./Post');

const Comment = sequelize.define('Comment', {
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
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true
});

Comment.belongsTo(Post, { foreignKey: 'postId' }); 
Post.hasMany(Comment, { foreignKey: 'postId', as :'comments' }); 


Comment.belongsTo(User, { foreignKey: 'userId', as:'userC'}); 
User.hasMany(Comment, { foreignKey: 'userId', as : 'userC' }); 


module.exports = Comment;



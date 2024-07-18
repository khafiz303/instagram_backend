
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/User');

const Follow = sequelize.define('Follow', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
  
  },{
    timestamps: false
});

User.hasMany(Follow, { foreignKey: 'user_id', as: 'userFollowing' });
User.hasMany(Follow, { foreignKey: 'follower_id', as: 'userFollower' });

Follow.belongsTo(User, { foreignKey: 'user_id', as: 'userFollowing' });
Follow.belongsTo(User, { foreignKey: 'follower_id', as: 'userFollower' });

module.exports = Follow
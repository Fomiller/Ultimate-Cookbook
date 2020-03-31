'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,25],
      },
    },
    first_name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [5],
      },
    },
    bio: DataTypes.TEXT,
    allowNull: true,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Recipe, {onDelete: 'cascade'});
  };
  return User;
};
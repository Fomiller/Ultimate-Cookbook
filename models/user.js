'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,25],
      },
    },
    firstName: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
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
    bio: {
      type:DataTypes.TEXT,
      allowNull: true,
    },
    userImage: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {});

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Recipe);
  };
  // check for valid password method
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook('beforeCreate', function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
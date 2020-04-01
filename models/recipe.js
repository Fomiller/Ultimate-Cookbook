'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type:DataTypes.STRING,
      allowNull: true,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // userID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // }
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      }
    });
    Recipe.hasMany(models.Comment, {
      foreignKey: {
        allowNull: false,
      }
    });
  };
  return Recipe;
};
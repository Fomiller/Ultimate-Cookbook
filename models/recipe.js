'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipe_name: {
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
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
    Recipe.belongsTo(models.User, {foreignKey: 'id', as: 'userID'});
  };
  return Recipe;
};
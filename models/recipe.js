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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    chefComments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: true,
      }
    });
    Recipe.hasMany(models.Comment, {
      foreignKey: {
        allowNull: true,
      }
    });
  };
  return Recipe;
};

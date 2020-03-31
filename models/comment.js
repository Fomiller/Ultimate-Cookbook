'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment_body: {
      type:DataTypes.TEXT,
      allNull: false,
    },
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Recipe, {foreignKey: 'id', as: 'recipeID'});
  };
  return comment;
};
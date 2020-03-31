'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment_body: {
      type:DataTypes.TEXT,
      allowNull: false,
    },
    recipe_id: {
      type: Sequelize.INTEGER,
      allNull: false,
    },
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull:false
      }
    });
  };
  return Comment;
};
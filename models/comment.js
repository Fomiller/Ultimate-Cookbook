'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commentBody: {
      type:DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  // Comment.associate = function(models) {
  //   // associations can be defined here
  //   Comment.belongsTo(models.Recipe, {
  //     foreignKey: {
  //       allowNull:false
  //     }
  //   });
  // };
  return Comment;
};
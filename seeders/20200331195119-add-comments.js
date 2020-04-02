'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Comments', [{
        commentBody: 'Amazing Cake',
        createdAt: new Date(),
        updatedAt: new Date(),
        RecipeId: null,
      },{
        commentBody: 'Best Steak Ever!',
        createdAt: new Date(),
        updatedAt: new Date(),
        RecipeId: null,
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Comments', null, {});
  }
};

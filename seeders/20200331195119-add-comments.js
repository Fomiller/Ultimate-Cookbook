'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Comments', [{
        comment_body: 'Amazing Cake',
        recipe_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        comment_body: 'Best Steak Ever!',
        recipe_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Comments', null, {});
  }
};

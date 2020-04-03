'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Recipes', [{
        recipeName: 'Chocolate Cake',
        ingredients: 'Flour, Eggs, Milk, Chocolate powder, Butter',
        instructions: 'Cook for 45 min at 400 degrees.',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: null,
      },{
        recipeName: 'Steak and Potatoes',
        ingredients: 'Steak, Potatoes, Corn',
        instructions: 'Cook the steak to a perfect medium rare, about 6 minutes. cook your baked potatoe to you liking. Steam your corn in the microwave. Plate. Done.',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: null,
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Recipes', null, {});
  }
};

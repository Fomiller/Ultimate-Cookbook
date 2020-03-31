'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.addColumn('Recipes', 'user_id', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.removeColumn('recipes', 'user_id');
  }
};

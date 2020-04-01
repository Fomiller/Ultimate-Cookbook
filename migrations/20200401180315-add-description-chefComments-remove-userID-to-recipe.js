'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('Recipes', 'description', Sequelize.TEXT, {transaction});
      await queryInterface.addColumn('Recipes', 'chefComments', Sequelize.TEXT, {transaction});
      await queryInterface.removeColumn('Recipes', 'user_id', {transaction});
      await transaction.commit();
      return Promise.resolve();
    } catch(err) {
      return Promise.reject(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Recipes', 'description', {transaction});
      await queryInterface.removeColumn('Recipes', 'chefComments', {transaction});
      await queryInterface.addColumn('Recipes', 'user_id', Sequelize.INTEGER, {transaction});
      await transaction.commit();
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

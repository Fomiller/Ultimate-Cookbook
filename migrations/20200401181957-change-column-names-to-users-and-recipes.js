'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.renameColumn('Recipes', 'recipe_name', 'recipeName', {transaction});
      await queryInterface.renameColumn('Users', 'first_name', 'firstName', {transaction});
      await queryInterface.renameColumn('Users', 'last_name', 'lastName', {transaction});
      await transaction.commit();
      return Promise.resolve();
    } catch(err) {
      return Promise.reject(err);
    }
},

down: async (queryInterface, Sequelize) => {
  let transaction = await queryInterface.sequelize.transaction();
      try {
        await queryInterface.renameColumn('Recipes', 'recipeName', 'recipe_name', {transaction});
        await queryInterface.renameColumn('Users', 'firstName', 'first_name', {transaction});
        await queryInterface.renameColumn('Users', 'lastName', 'last_name', {transaction});
        await transaction.commit();
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
}
};

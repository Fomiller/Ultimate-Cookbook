'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [{
        username: 'GRamsey',
        password: 'password456',
        first_name: 'Gordon',
        last_name: 'Ramsey',
        email: 'GRamsey@test.com',
        bio:'I am the greatest chef in the world!!!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'ChefJohn',
        password: 'password123',
        first_name: 'John',
        last_name: 'Smith',
        email: 'JohnSmith@test.com',
        bio:'',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};

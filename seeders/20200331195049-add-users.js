'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [{
        username: 'GRamsey',
        password: 'password456',
        firstName: 'Gordon',
        lastName: 'Ramsey',
        email: 'GRamsey@test.com',
        bio:'I am the greatest chef in the world!!!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'ChefJohn',
        password: 'password123',
        firstName: 'John',
        lastName: 'Smith',
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

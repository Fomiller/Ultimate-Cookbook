'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.renameColumn('comments', 'comment_body','commentBody');
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.renameColumn('comments', 'commentBody','comment_body');
  }
};

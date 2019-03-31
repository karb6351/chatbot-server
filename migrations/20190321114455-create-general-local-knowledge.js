'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GeneralLocalKnowledges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reminder: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      event_id: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GeneralLocalKNowledges');
  }
};
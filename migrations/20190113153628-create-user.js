'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      identifier: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      // password: {
      //   type: Sequelize.STRING,
      //   validate: {
      //     notNull: true,
      //     notEmpty: true,
      //   }
      // },
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
    return queryInterface.dropTable('users');
  }
};
'use strict';
const type = ['restaurant', 'general_local_knowledge'];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      instruction: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      order: {
        type: Sequelize.INTEGER
      },
      route_id:{
        type: Sequelize.INTEGER
      },
      model_id:{
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM(type[0], type[1])
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
    return queryInterface.dropTable('Events');
  }
};
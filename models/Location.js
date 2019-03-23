const Sequelize = require('sequelize');
const sequelizeService = require('../app/services/sequelize_service');

const location = sequelizeService.define('location', {
    location: {
      type: Sequelize.GEOMETRY,
      allowNull: false,
      validate: {
        notNull(value) {
          if (value == null) {
            throw new Error('Empty location')
          }
        }
      }
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull(value) {
          if (value == null) {
            throw new Error('Empty name')
          }
        }
      }
    }
  });



  module.exports = location
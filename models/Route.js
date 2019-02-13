const Sequelize = require('sequelize');
const sequelizeService = require('../app/services/sequelize_service')

const location = require('./location');

const route = sequelizeService.define('route', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull(value) {
          if (value == null) {
            throw new Error('Empty title')
          }
        }
      }
    },
    thumbnail: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull(value) {
          if (value == null) {
            throw new Error('Empty thumbnail')
          }
        }
      }
    }
  });

  route.hasMany(location);
  
  module.exports = route
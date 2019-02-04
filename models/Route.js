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
    }
  });

  route.hasMany(location);
  
  module.exports = route
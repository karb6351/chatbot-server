const Sequelize = require('sequelize');
const sequelizeService = require('../app/services/sequelize_service');

const route = require('./route');
// const restaurant = require('./restaurant');
// const event = require('./event');
// const generalLocalKnowledge = require('./generalLocalKnowledge');

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

  // Location.hasOne(restaurant);
  // Location.hasOne(event);
  // Location.hasOne(generalLocalKnowledge);

  
  module.exports = location
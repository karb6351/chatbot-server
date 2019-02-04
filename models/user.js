const Sequelize = require('sequelize');
const sequelizeService = require('../app/services/sequelize_service')

const User = sequelizeService.define('users', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull(value) {
          if (value == null) {
            throw new Error('Empty username')
          }
        }
      }
    },
    identifier: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull(value) {
          if (value == null) {
            throw new Error('Empty identifier')
          }
        }
      }
    },
    // password: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   validate: {
    //     notNull(value) {
    //       if (value == null) {
    //         throw new Error('Empty password')
    //       }
    //     }
    //   }
    // }
  });
  
  module.exports = User
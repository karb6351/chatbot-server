const Sequelize = require('sequelize');
const sequelizeService = require('../app/services/sequelize_service')

const Admin = sequelizeService.define('admins', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull(value) {
          if (value == null) {
            throw new Error('Empty username')
          }
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull(value) {
          if (value == null) {
            throw new Error('Empty password')
          }
        }
      }
    }
  });
  
  module.exports = Admin
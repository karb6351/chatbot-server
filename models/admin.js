const Sequelize = require('sequelize');
const sequelize = require('../app/services/sequelize_service');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Sequelize.Model{}
  Admin.init({
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
  },{ sequelize })
  return Admin
}

// const Admin = sequelizeService.define('admins', {
//     username: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         notNull(value) {
//           if (value == null) {
//             throw new Error('Empty username')
//           }
//         }
//       }
//     },
//     password: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       validate: {
//         notNull(value) {
//           if (value == null) {
//             throw new Error('Empty password')
//           }
//         }
//       }
//     }
//   });
  
//   module.exports = Admin
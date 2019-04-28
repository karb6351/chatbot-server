const Sequelize = require('sequelize');
const sequelize = require('../src/services/sequelize_service');

module.exports = (sequelize, DataTypes) => {
  class User extends Sequelize.Model{}
  User.init({
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
  },{ sequelize})
  // Culture.belongsToMany(Restaurant, { through: CultureRestaurant, foreignKey: 'culture_id', otherKey: 'restaurant_id'});
  return User
}


// const User = sequelizeService.define('users', {
//     username: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       validate: {
//         notNull(value) {
//           if (value == null) {
//             throw new Error('Empty username')
//           }
//         }
//       }
//     },
//     identifier: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       validate: {
//         notNull(value) {
//           if (value == null) {
//             throw new Error('Empty identifier')
//           }
//         }
//       }
//     },
//     // password: {
//     //   type: Sequelize.STRING,
//     //   allowNull: false,
//     //   validate: {
//     //     notNull(value) {
//     //       if (value == null) {
//     //         throw new Error('Empty password')
//     //       }
//     //     }
//     //   }
//     // }
//   });
  
//   module.exports = User
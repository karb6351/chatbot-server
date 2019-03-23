// 'use strict';
const sequelizeService = require('../app/services/sequelize_service');

const restaurant = require('./restaurant');
const food = require('./food');

class Culture extends Model {}
Culture.init({
  tableName: 'cultures',
  timestamps: true,
  name: DataTypes.STRING,
  description: DataTypes.TEXT
}, {
  sequelizeService
})

Culture.belongsToMany(restaurant, { through: 'CultureRestaurant', foreignKey: "culture_id"});
Culture.belongsToMany(food, { through: 'CultureFood', foreignKey: "culture_id"});

module.exports = Culture;

// module.exports = (sequelize, DataTypes) => {
//   const Culture = sequelize.define('Culture', {
//     name: DataTypes.STRING,
//     description: DataTypes.TEXT
//   }, {});
//   Culture.associate = function(models) {
//     // associations can be defined here
//     models.belongsToMany(restaurant, { through: 'CultureRestaurant', foreignKey: "culture_id"});
//     models.belongsToMany(food, { through: 'CultureFood', foreignKey: "culture_id"});
//   };
//   return Culture;
// };
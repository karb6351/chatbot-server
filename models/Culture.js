
const Sequelize = require('sequelize');
const sequelize = require('../src/services/sequelize_service');

module.exports = (sequelize, DataTypes) => {
  class Culture extends Sequelize.Model{}
  Culture.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    color: DataTypes.STRING
  },{ sequelize })
  Culture.associate = function(models) {
    // associations can be defined here
    Culture.belongsToMany(models.Restaurant, { through: models.CultureRestaurant, as: 'restaurant', foreignKey: 'culture_id', otherkey: 'restaurant_id'})
  };
  return Culture
}

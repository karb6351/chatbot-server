'use strict';
const culture = require('./culture');

module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    restaurant_id: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    // associations can be defined here
    models.belongsToMany(culture, { through: 'CultureRestaurant', foreignKey: "food_id"})
  };
  return Food;
};
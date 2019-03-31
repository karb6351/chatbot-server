const Sequelize = require('sequelize');
const sequelize = require('../app/services/sequelize_service');

module.exports = (sequelize, DataTypes) => {
  class FoodRestaurant extends Sequelize.Model {}
  FoodRestaurant.init({
    restaurant_id: DataTypes.INTEGER,
    food_id: DataTypes.INTEGER
  },{
    sequelize
  });
  return FoodRestaurant;
}

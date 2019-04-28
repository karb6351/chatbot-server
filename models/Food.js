
const Sequelize = require('sequelize');
const sequelize = require('../src/services/sequelize_service');

module.exports = (sequelize, DataTypes) => {
  class Food extends Sequelize.Model{}
  Food.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    photos: DataTypes.TEXT,
    restaurant_id: DataTypes.INTEGER
  }, { sequelize, timestamps: true, tableName: 'foods' });
  Food.associate = function(models) {
    // associations can be defined here
    Food.belongsToMany(models.Restaurant, { through: models.FoodRestaurant, as: 'restaurant', foreignKey: "food_id", otherKey: "restaurant_id"})
  };
  return Food
}

'use strict';
const Culture = require('./culture');

const Sequelize = require('sequelize');
const sequelize = require('../app/services/sequelize_service');

class Food extends Sequelize.Model{}
Food.init({
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  photos: Sequelize.TEXT,
  restaurant_id: Sequelize.INTEGER
}, { sequelize, timestamps: true, tableName: 'foods' });

// Food.belongsToMany(Culture, { through: 'CultureRestaurant', foreignKey: "food_id"})

module.exports = Food;
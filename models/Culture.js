// 'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../app/services/sequelize_service');

const Restaurant = require('./restaurant');
const Food = require('./food');

class Culture extends Sequelize.Model{}
Culture.init({
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  color: Sequelize.STRING
},{ sequelize })

// Culture.belongsToMany(Restaurant, { through: 'CultureRestaurant', foreignKey: "culture_id"});
// Culture.belongsToMany(Food, { through: 'CultureFood', foreignKey: "culture_id"});

module.exports = Culture;

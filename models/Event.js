// 'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../app/services/sequelize_service');

const Restaurant = require('./restaurant');
const GeneralLocalKnowledge = require('./generallocalknowledge');

const type = ['restaurant', 'general_local_knowledge'];

class Event extends Sequelize.Model {}
Event.init({
  instruction: Sequelize.STRING,
  duration: Sequelize.INTEGER,
  order: Sequelize.INTEGER,
  type: Sequelize.ENUM(type[0], type[1]),
  route_id: Sequelize.INTEGER,
  model_id: Sequelize.INTEGER
},{
  sequelize
});

Event.belongsTo(Restaurant, { foreignKey: 'model_id'})
Event.belongsTo(GeneralLocalKnowledge, { foreignKey: 'model_id'})

module.exports = Event;

const Sequelize = require('sequelize');
const sequelize = require('../src/services/sequelize_service');

module.exports = (sequelize, DataTypes) => {
  class GeneralLocalKnowledge extends Sequelize.Model {}
  GeneralLocalKnowledge.init({
    reminder: DataTypes.STRING,
    name: DataTypes.STRING,
    location: DataTypes.STRING
  },{ sequelize })
  return GeneralLocalKnowledge;
}

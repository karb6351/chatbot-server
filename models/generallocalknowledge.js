const Sequelize = require('sequelize');
const sequelize = require('../app/services/sequelize_service');

class GeneralLocalKnowledge extends Sequelize.Model {}
GeneralLocalKnowledge.init({
  reminder: Sequelize.STRING,
  location: Sequelize.GEOMETRY
},{ sequelize })

module.exports = GeneralLocalKnowledge;

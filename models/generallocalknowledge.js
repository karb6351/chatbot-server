'use strict';
const event = require('./event');
module.exports = (sequelize, DataTypes) => {
  const GeneralLocalKnowledge = sequelize.define('GeneralLocalKnowledge', {
    reminder: DataTypes.STRING,
    event_id: DataTypes.INTEGER
  }, {});
  GeneralLocalKnowledge.associate = function(models) {
    // associations can be defined here
    models.belongs(event);
  };
  return GeneralLocalKNowledge;
};
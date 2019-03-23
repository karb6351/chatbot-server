'use strict';

const location = require('./location');

const type = ['restaurant', 'general_local_knowledge'];


module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    instruction: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    type: DataTypes.ENUM(type[0], type[1])
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    models.belongsTo(location);
  };
  return Event;
};
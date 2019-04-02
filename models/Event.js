// 'use strict';
const Sequelize = require('sequelize');

const type = [ 
  {
    id: 1,
    value: 'restaurant', 
  },
  {
    id: 2,
    value: 'general_local_knowledge' 
  }
];
const instruction = [
	{
		id: 1,
		value: 'stop'
	},
	{
		id: 2,
		value: 'run'
	},
	{
		id: 3,
		value: 'eat'
	}
];

exports.type = type;
exports.instruction = instruction;

module.exports = (sequelize, DataTypes) => {
	class Event extends Sequelize.Model {}
	Event.init(
		{
			instruction: DataTypes.STRING,
			duration: DataTypes.INTEGER,
			order: DataTypes.INTEGER,
			type: DataTypes.ENUM(type[0].value, type[1].value),
			color: DataTypes.STRING,
			route_id: DataTypes.INTEGER,
			model_id: DataTypes.INTEGER
		},
		{
			sequelize
		}
	);

	Event.associate = function(models) {
		// associations can be defined here
		Event.belongsTo(models.Restaurant, { foreignKey: 'model_id' });
		Event.belongsTo(models.GeneralLocalKnowledge, { foreignKey: 'model_id' });
	};
	return Event;
};

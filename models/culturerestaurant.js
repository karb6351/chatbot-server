const Sequelize = require('sequelize');
const sequelize = require('../app/services/sequelize_service');

module.exports = (sequelize, DataTypes) => {
	class CultureRestaurant extends Sequelize.Model {}
	CultureRestaurant.init(
		{
			restaurant_id: DataTypes.INTEGER,
			culture_id: DataTypes.INTEGER
		},
		{
			sequelize
		}
	);
	return CultureRestaurant;
};

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

const sequelize = new Sequelize(
	`${config.database}`,
	`${config.username}`,
	`${config.password}`,
	{
		dialect: `${config.dialect}`,
		host: `${config.host}`,
		define: {
			charset: 'utf8',
			collate: 'utf8_general_ci', 
			timestamps: true
		},
	},
);

module.exports = sequelize;

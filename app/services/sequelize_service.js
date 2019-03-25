const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	`${process.env.DB_DATABASE}`,
	`${process.env.DB_USERNAME}`,
	`${process.env.DB_PASSWORD}`,
	{
		dialect: `${process.env.DB_DIALECT}`,
		host: `${process.env.DB_HOST}`,
		define: {
			charset: 'utf8',
			collate: 'utf8_general_ci', 
			timestamps: true
		},
	},
);

module.exports = sequelize;

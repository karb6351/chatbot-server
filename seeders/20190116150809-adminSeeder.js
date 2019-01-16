'use strict';

const passwordHelper = require('../helpers/password_helper');

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    passwordHelper.bcryptPassword('123456').then(hashPassword => {})
		return queryInterface.bulkInsert(
			'admins',
			[
				{
          username: 'admin',
          password: passwordHelper.bcryptPasswordSync('123456')
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
		return queryInterface.bulkDelete('admins', null, {});
	}
};

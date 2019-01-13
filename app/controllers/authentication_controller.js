const User = require('../../models/User');

const passwordHelper = require('../../helpers/password_helper');
const tokenHelper = require('../../helpers/token_helper');

const authentication = {
	apiRegister: (req, res) => {
		passwordHelper
			.bcryptPassword(req.body.password)
			.then((hash) => {
				return User.create({
					username: req.body.username,
					password: hash
				});
			})
			.then((result) => {
				console.log('register user: ', req.body.username);
				res.status(200).json({
					status: true,
					message: 'Successfully to register'
				});
			})
			.catch((error) => {
				console.error(error.message);
				res.status(500).json({ success: false, message: 'Internal server error' });
			});
	},
	apiLogin: (req, res) => {
		User.findOne({
			where: {
				username: req.body.username
			}
		})
			.then((user) => {
				// throw an exception when user not found
				if (!user) throw Error('User not found');
				console.log('User id: ', user);
				// do the password comparsion
				return passwordHelper.comparePassword(req.body.password, user.password);
			})
			.then((result) => {
				//
				if (result) {
					// generate jwt when it is authenticated
					const jwt = tokenHelper.generateToken(req.body.username);
					res.status(200).json({ success: true, token: jwt });
				} else {
					throw Error('Invalid password');
				}
			})
			.catch((error) => {
				console.error(error.message);
				res.status(404).json({ success: false, message: error.message });
			});
	},
	apiLogout: (req, res) => {
		
	},
	login: (req, res) => {},
	doLogin: (req, res) => {},
	logout: (req, res) => {}
};

module.exports = authentication;

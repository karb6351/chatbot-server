const User = require('../../models/user');
const Admin = require('../../models/admin')

const passwordHelper = require('../../helpers/password_helper');
const tokenHelper = require('../../helpers/token_helper');
const notificationHelper = require('../../helpers/notification_helper');

exports.apiRegister =  (req, res) => {
	const { username, password } = req.body
	//do validation

	
	passwordHelper
		.bcryptPassword(password)
		.then((hash) => {
			return User.create({
				username: username,
				password: hash
			});
		})
		.then((result) => {
			console.log('register user: ', username);
			res.status(200).json({
				status: true,
				message: 'Successfully to register'
			});
		})
		.catch((error) => {
			console.error(error.message);
			res.status(500).json({ success: false, message: 'Internal server error' });
		});
};

exports.apiLogin = (req, res) => {
	const { username, password } = req.body; 
	//do validation


	User.findOne({
		where: { username }
	})
		.then((user) => {
			// throw an exception when user not found
			if (!user){
				throw Error('User not found');
			}
			// do the password comparsion
			return passwordHelper.comparePassword(password, user.password);
		})
		.then((result) => {
			//
			if (result) {
				// generate jwt when it is authenticated
				const jwt = tokenHelper.generateToken(username);
				res.status(200).json({ success: true, token: jwt });
			} else {
				throw Error('Invalid password');
			}
		})
		.catch((error) => {
			console.error(error.message);
			res.status(404).json({ success: false, message: error.message });
		});
};

exports.apiLogout = (req, res) => {};

exports.login = (req, res) => {
	res.render('pages/authentication/login');
};

exports.doLogin = (req, res) => {
	const {username, password} = req.body;
	Admin.findOne({
		where: { username },
	})
	.then(user => {
		if (!user) throw Error('User not found');
			// do the password comparsion
			return passwordHelper.comparePassword(password, user.password);	
	})
	.then(result => {
		if (result) {
			if (req.is('application/json')){
				const jwt = tokenHelper.generateToken(username);
				res.status(200).json({
					token: jwt,
					success: true
				})
			}else{
				// generate jwt when it is authenticated
				req.session.username = username
				req.flash('flash_message', 'asd');
				// notificationHelper.addFlashMessage(req, notificationHelper.SUCCESS, `Welcome back.${username}`)
				res.redirect('/home')
			}
		} else {
			throw Error('Invalid password');
		}
	})
	.catch(error => {
		console.error(error)
		if (req.is('application/json')){
			return res.status(200).json({
				message: error.message,
				success: false
			})
		}else{
			res.redirect('back')
		}
	})
};

exports.logout = (req, res) => {
	req.session.username = null;
	res.redirect('/home')
};

const tokenHelper = require('../../helpers/token_helper');

exports.auth = (req, res, next) => {
	try {
		const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.split(" ")[1];
		const decode = tokenHelper.verifyToken(token);
		req.userData = decode;
		console.log(req.userData);
		next();
	} catch (err) {
		console.log(err.message);
		res.status(404).json({ success: false, message: 'Unauthentication' });
	}
};

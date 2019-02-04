const tokenHelper = require('../../helpers/token_helper');
const _ = require('underscore')
const guestPath = ['/login', '/chat/init']

module.exports = (req, res, next) => {
	// for guest
  if (_.contains(guestPath, req.path)){
    next()
  }else{
    // for authenticated user
    try {
			const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.split(" ")[1];
			const decode = tokenHelper.verifyToken(token);
			console.log(decode);
			req.userData = decode;
			next();
		} catch (err) {
			res.status(404).json({ success: false, message: 'Unauthentication' });
		}
  }
};

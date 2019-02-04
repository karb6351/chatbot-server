const jwt = require('jsonwebtoken')

exports.generateToken = (payload) =>
	jwt.sign({ id: payload }, `${process.env.JWT_CERT}`, {
		// expiresIn: "1d"
	})

exports.verifyToken = token => jwt.verify(token, `${process.env.JWT_CERT}`)
const jwt = require('jsonwebtoken')

exports.generateToken = ({ username }) =>
	jwt.sign({ username }, `${process.env.JWT_CERT}`, {
		expiresIn: "1d"
	})

exports.verifyToken = token => jwt.verify(token, `${process.env.JWT_CERT}`)
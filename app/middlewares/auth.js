const tokenHelper = require('../helpers/token_helper')

exports.auth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    const decode = tokenHelper.verifyToken(token)
    if (!(token && decode)){
        res.status(404).json({success: false, message: 'Unauthentication'})
    }else{
        req.decode = decode
        next()
    }
}
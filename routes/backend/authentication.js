const router = require('express').Router()

const authenticationController = require("../../app/controllers/authentication_controller")

router.get('/login', authenticationController.login)
router.post('/login', authenticationController.doLogin)
router.post('/logout', authenticationController.logout)

module.exports = router
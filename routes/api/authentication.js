const router = require('express').Router()

const authenticationController = require("../../app/controllers/authentication_controller")

router.post('/login', authenticationController.apiLogin)
router.post('/register', authenticationController.apiRegister)

module.exports = router
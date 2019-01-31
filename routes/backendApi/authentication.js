const router = require('express').Router()

const authenticationController = require("../../app/controllers/authentication_controller")

router.post('/login', authenticationController.backendApiLogin)
router.post('/register', authenticationController.backendApiRegister)

module.exports = router
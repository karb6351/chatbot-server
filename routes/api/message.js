const router = require('express').Router()

const messageController = require("../../app/controllers/message_controller")

router.post('/', messageController.index)

module.exports = router

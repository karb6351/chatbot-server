const router = require("express").Router()

//add router group(api) to express module

router.use("/message", require("./message.js"))

router.use("/", require("./authentication.js"))

module.exports = router
const bcrypt = require('bcrypt')

const saltRounds = 10

exports.bcryptPassword = password => bcrypt.hash(password, saltRounds)

exports.comparePassword = (inputPassword, correctPassword) => bcrypt.compare(inputPassword, correctPassword)
const mongoose = require('mongoose')

module.exports = mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${
        process.env.MONGODB_PASSWORD
    }@${process.env.MONGODB_DATABASE}-6favs.mongodb.net/test?retryWrites=true`
)

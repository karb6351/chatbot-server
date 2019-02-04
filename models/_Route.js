const mongoose = require('mongoose')

const RouteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }],
    title: {
        type: mongoose.Schema.Types.String,
    }

})

module.exports = mongoose.Model('Route', RouteSchema)
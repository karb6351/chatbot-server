const mongoose = require('mongoose')

const LocationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    routes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Route"
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }] 

})

module.exports = mongoose.Model('Location', LocationSchema)

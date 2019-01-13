const mongoose = require('mongoose')

const RestaurantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    location:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        require: true
    },
    foods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }],
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        require: true
    },
    culture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Culture',
        require: true
    }
})

module.exports = mongoose.Model('Restaurant', RestaurantSchema)
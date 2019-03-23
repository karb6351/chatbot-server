const mongoose = require('mongoose')

const ContextSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: {
        type: String,
        require: true
    },
    answer: {
        type: String,
        require: true
    },
    intent: {
        type: String,
        require: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    time: {
        type : Date, 
        default: Date.now
    }
})

module.exports = mongoose.Model('Context', ContextSchema)
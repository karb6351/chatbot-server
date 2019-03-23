const mongoose = require('mongoose')

const TemplateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    intent: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
})

module.exports = mongoose.Model('Template', TemplateSchema)